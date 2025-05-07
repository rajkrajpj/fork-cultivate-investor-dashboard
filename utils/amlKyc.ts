interface KycAmlResponse {
  statusCode?: string;
  statusDesc?: string;
  kyc?: {
    response: {
      'id-number': string;
      'summary-result': {
        key: string;
        message: string;
      };
      results: {
        key: string;
        message: string;
      };
      qualifiers?: {
        qualifier:
          | Array<{ key: string; message: string }>
          | { key: string; message: string };
      };
      restriction?: {
        key: string;
        message: string;
        pa:
          | { list: string; score: string }
          | Array<{ list: string; score: string }>;
      };
      'idliveq-error'?: {
        key: string;
        message: string;
      };
      idnotescore: string;
    };
    kycstatus: string;
    amlstatus: string;
  };
  idRequestNumber?: string;
  kycResultKey?: string;
  kycResultMessage?: string;
  success?: boolean;
  notes?: string | null;
  response?: {
    'id-number': string;
    'summary-result': {
      key: string;
      message: string;
    };
    results: {
      key: string;
      message: string;
    };
    qualifiers?: {
      qualifier:
        | Array<{ key: string; message: string }>
        | { key: string; message: string };
    };
    idnotescore: string;
  };
  kycstatus?: string;
  amlstatus?: string;
}

interface AmlResponse {
  statusCode: string;
  statusDesc: string;
  partyDetails: {
    response: {
      'id-number': string;
      restriction: {
        key: string;
        message: string;
      };
    };
    amlStatus: string;
  };
}

interface NewKycAmlResponse {
  aml?: AmlResponse;
  kyc?: {
    statusCode: string;
    statusDesc: string;
    kyc: {
      response: {
        'id-number': string;
        'summary-result': {
          key: string;
          message: string;
        };
        results: {
          key: string;
          message: string;
        };
        qualifiers?: {
          qualifier: Array<{ key: string; message: string }>;
        };
        idnotescore: string;
      };
      kycstatus: string;
      amlstatus: string;
    };
  };
}

// Update the existing interface to include the new structure
interface KycAmlChecks {
  northCapital: KycAmlResponse | NewKycAmlResponse;
}

type AnalysisType = 'KYC' | 'AML';

export const isAmlKycCleared = (userPayment: {
  kycAMLChecks: KycAmlChecks;
}): boolean => {
  const { northCapital } = userPayment.kycAMLChecks;

  // Type guard to check if it's the new structure
  const isNewStructure = (
    response: KycAmlResponse | NewKycAmlResponse
  ): response is NewKycAmlResponse => {
    return 'aml' in response && 'kyc' in response;
  };

  // Handle the new structure
  if (isNewStructure(northCapital)) {
    const amlStatus = northCapital.aml?.partyDetails?.amlStatus;
    const kycStatus = northCapital.kyc?.kyc?.kycstatus;

    if (!amlStatus || !kycStatus) {
      console.warn('AML/KYC status missing in new structure', { northCapital });
      return false;
    }

    return amlStatus === 'Auto Approved' && kycStatus === 'Auto Approved';
  }

  // Handle the original structure with kyc object
  if (northCapital.kyc) {
    return (
      northCapital.kyc.kycstatus === 'Auto Approved' &&
      northCapital.kyc.amlstatus === 'Auto Approved'
    );
  }

  // Handle the original flat structure
  if (northCapital.kycstatus && northCapital.amlstatus) {
    return (
      northCapital.kycstatus === 'Auto Approved' &&
      northCapital.amlstatus === 'Auto Approved'
    );
  }

  // If no specific status is available, fall back to the success field
  console.warn('Falling back to success field for AML/KYC check', {
    northCapital
  });
  return northCapital.success ?? false;
};

export const processKYCAMLQualifiers = (item: any, type: 'KYC' | 'AML') => {
  try {
    const { northCapital } = item.kycAMLChecks;
    const kycChecks = northCapital?.kyc;

    // Check for disapproval statuses
    const isKYCDisapproved =
      (kycChecks?.kycstatus === 'Disapproved' ||
        northCapital?.kycstatus === 'Disapproved') &&
      type === 'KYC';
    const isAMLDisapproved =
      (kycChecks?.amlstatus === 'Disapproved' ||
        northCapital?.amlstatus === 'Disapproved') &&
      type === 'AML';

    // Handle case where kycChecks is not defined or statuses are missing
    if (!kycChecks && !northCapital?.kycstatus && !northCapital?.amlstatus) {
      return northCapital?.notes ? [northCapital.notes] : [];
    }

    const qualifiers = kycChecks.response?.qualifiers?.qualifier || [];

    if (isKYCDisapproved) {
      return qualifiers && qualifiers.length > 0
        ? qualifiers.map((qualifier: any) => qualifier.message)
        : [kycChecks.response?.results?.message].filter(Boolean);
    }

    if (isAMLDisapproved && qualifiers) {
      return qualifiers.map((qualifier: any) => qualifier.message);
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Test functions

export const analyzeKycAmlResponseNorthCapital = (
  response: KycAmlResponse,
  analysisType: AnalysisType
) => {
  if (analysisType === 'KYC') {
    return analyzeKyc(response);
  } else {
    return analyzeAml(response);
  }
};

export const analyzeKyc = (
  response: KycAmlResponse | NewKycAmlResponse
): string[] => {
  const issues: string[] = [];

  try {
    // Type guard for new structure
    const isNewStructure = (response: any): response is NewKycAmlResponse => {
      return 'aml' in response && 'kyc' in response;
    };

    if (isNewStructure(response)) {
      const kycResponse = response.kyc?.kyc;

      if (kycResponse) {
        // Check KYC status and results
        if (kycResponse.kycstatus === 'Disapproved') {
          const summaryResult = kycResponse.response['summary-result'];
          const results = kycResponse.response.results;

          if (summaryResult?.key === 'id.failure') {
            issues.push(summaryResult.message);
          }
          if (results?.key === 'result.no.match') {
            issues.push(results.message);
          }
        }

        // Handle qualifiers
        if (kycResponse.response.qualifiers?.qualifier) {
          const qualifiers = Array.isArray(
            kycResponse.response.qualifiers.qualifier
          )
            ? kycResponse.response.qualifiers.qualifier
            : [kycResponse.response.qualifiers.qualifier];

          qualifiers.forEach((q) => issues.push(q.message));
        }
      }
      return issues;
    }

    // Handle original structure with nested kyc
    if (response.kyc) {
      if (response.kyc.kycstatus === 'Disapproved') {
        if (response.kyc.response['summary-result'].key === 'id.failure') {
          issues.push(response.kyc.response['summary-result'].message);
        }
        if (response.kyc.response.results.key === 'result.no.match') {
          issues.push(response.kyc.response.results.message);
        }
        if (response.kyc.response['idliveq-error']) {
          issues.push(response.kyc.response['idliveq-error'].message);
        }
      }

      if (response.kyc.response.qualifiers) {
        const qualifiers = Array.isArray(
          response.kyc.response.qualifiers.qualifier
        )
          ? response.kyc.response.qualifiers.qualifier
          : [response.kyc.response.qualifiers.qualifier];

        qualifiers.forEach((q) => issues.push(q.message));
      }
    }
    // Handle flat structure
    else {
      if (response.kycResultKey === 'result.no.match') {
        issues.push(response.kycResultMessage || 'ID Not Located');
      }
      if (response.notes) {
        issues.push(response.notes);
      }
      if (response.response) {
        if (response.response['summary-result']?.key === 'id.failure') {
          issues.push(response.response['summary-result'].message);
        }
        if (response.response.results?.key === 'result.no.match') {
          issues.push(response.response.results.message);
        }
      }
    }

    return issues;
  } catch (error) {
    console.error('analyzeKyc error:', error, { response });
    return issues;
  }
};

export const analyzeAml = (response: KycAmlResponse): string[] => {
  const issues: string[] = [];

  // Handle the original structure
  if (response.kyc) {
    if (response.kyc.amlstatus === 'Disapproved') {
      if (response.kyc.response.restriction) {
        issues.push(response.kyc.response.restriction.message);
        if (Array.isArray(response.kyc.response.restriction.pa)) {
          response.kyc.response.restriction.pa.forEach((item) => {
            issues.push(`${item.list} (Score: ${item.score})`);
          });
        } else {
          issues.push(
            `${response.kyc.response.restriction.pa.list} (Score: ${response.kyc.response.restriction.pa.score})`
          );
        }
      }
    }
  }
  // Handle the new structure
  else {
    // The new structure doesn't seem to have specific AML fields,
    // so we'll just check if it's not successful
    if (response.success === false) {
      issues.push('AML check not successful');
    }
  }

  return issues;
};

/**
 * Interface for the new simplified KYC/AML check structure
 */
export interface SimplifiedKycAmlCheck {
  id: string;
  providerId: string;
  userId: string;
  checkDate: string;
  kycStatus: string;
  amlStatus: string;
  additionalData: {
    results?: {
      key: string;
      message: string;
    };
    'id-number'?: string;
    'idliveq-error'?: {
      key: string;
      message: string;
    };
    'summary-result'?: {
      key: string;
      message: string;
    };
  };
  paymentProvider: {
    name: string;
  };
}

/**
 * Check if KYC/AML is cleared in the simplified format
 * This is a standalone function to avoid modifying existing code
 */
export const isSimplifiedKycAmlCleared = (
  kycamlCheck: SimplifiedKycAmlCheck
): boolean => {
  return (
    kycamlCheck.kycStatus === 'Auto Approved' &&
    kycamlCheck.amlStatus === 'Auto Approved'
  );
};

/**
 * Extract KYC issues from the simplified format
 */
export const getKycIssueFromSimplified = (
  kycamlCheck: SimplifiedKycAmlCheck
): string | undefined => {
  if (kycamlCheck.kycStatus !== 'Disapproved') {
    return undefined;
  }

  const messages: string[] = [];

  // Add summary result message if available
  if (kycamlCheck.additionalData['summary-result']?.message) {
    messages.push(kycamlCheck.additionalData['summary-result'].message);
  }

  // Add results message if available
  if (kycamlCheck.additionalData.results?.message) {
    messages.push(kycamlCheck.additionalData.results.message);
  }

  // Add idliveq-error message if available
  if (kycamlCheck.additionalData['idliveq-error']?.message) {
    messages.push(kycamlCheck.additionalData['idliveq-error'].message);
  }

  return messages.length > 0 ? messages.join('; ') : 'KYC Disapproved';
};

/**
 * Extract AML issues from the simplified format
 */
export const getAmlIssueFromSimplified = (
  kycamlCheck: SimplifiedKycAmlCheck
): string | undefined => {
  if (kycamlCheck.amlStatus !== 'Disapproved') {
    return undefined;
  }

  // Note: In the provided example, there's no specific AML issue data
  // This is a placeholder for when you have that data
  return 'AML Disapproved';
};

/**
 * Process qualifiers from the simplified format for compatibility with existing code
 */
export const processSimplifiedKycAmlQualifiers = (
  kycamlCheck: SimplifiedKycAmlCheck,
  type: 'KYC' | 'AML'
): string[] => {
  if (
    (type === 'KYC' && kycamlCheck.kycStatus !== 'Disapproved') ||
    (type === 'AML' && kycamlCheck.amlStatus !== 'Disapproved')
  ) {
    return [];
  }

  if (type === 'KYC') {
    const messages: string[] = [];

    // Add results message if available
    if (kycamlCheck.additionalData.results?.message) {
      messages.push(kycamlCheck.additionalData.results.message);
    }

    // Add summary result message if available
    if (kycamlCheck.additionalData['summary-result']?.message) {
      messages.push(kycamlCheck.additionalData['summary-result'].message);
    }

    // Add idliveq-error message if available
    if (kycamlCheck.additionalData['idliveq-error']?.message) {
      messages.push(kycamlCheck.additionalData['idliveq-error'].message);
    }

    return messages;
  }

  // For AML type
  return ['AML Disapproved']; // Placeholder - update when AML-specific data is available
};
