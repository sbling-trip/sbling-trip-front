import { useState } from 'react'

export interface TermsState {
  term1: boolean
  term2: boolean
  term3: boolean
  term4: boolean
  [key: string]: boolean
}

interface UseTermsAgreementProps {
  initialTerms: TermsState
}

const useTermsAgreement = ({ initialTerms }: UseTermsAgreementProps) => {
  const [selectAllTerms, setSelectAllTerms] = useState<boolean>(false)
  const [termsAgreed, setTermsAgreed] = useState<TermsState>(initialTerms)

  const handleSelectAgreeAll = () => {
    setSelectAllTerms((prevSelectAll) => !prevSelectAll)
    setTermsAgreed({
      term1: !selectAllTerms,
      term2: !selectAllTerms,
      term3: !selectAllTerms,
      term4: !selectAllTerms,
    })
  }

  const handleSelectTerm = (term: keyof TermsState) => {
    setTermsAgreed((prevTerms) => ({
      ...prevTerms,
      [term]: !prevTerms[term],
    }))
  }

  return {
    selectAllTerms,
    termsAgreed,
    handleSelectAgreeAll,
    handleSelectTerm,
  }
}

export default useTermsAgreement
