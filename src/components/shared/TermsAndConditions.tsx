import { useState } from 'react'
import IconCheck from '@assets/icon/icon-check.svg?react'
import IconArrow from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './TermsAndConditions.module.scss'

const cx = classNames.bind(styles)

interface TermsAndConditionsProps {
  onTermsUpdate: (terms: TermsState) => void
}

export interface TermsState {
  term1: boolean
  term2: boolean
  term3: boolean
  term4: boolean
  [key: string]: boolean
}

const terms = [
  { key: 'term1', label: '만 14세 이상 이용 동의 (필수)' },
  { key: 'term2', label: '개인정보 제 3자 제공 동의 (필수)' },
  { key: 'term3', label: '개인 정보 수집 및 이용 동의 (필수)' },
]

const TermsAndConditions = ({ onTermsUpdate }: TermsAndConditionsProps) => {
  const [selectAllTerms, setSelectAllTerms] = useState<boolean>(false)
  const [termsAgreed, setTermsAgreed] = useState<TermsState>({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
  })

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
    setTermsAgreed((prevTerms) => {
      const updatedTerms = {
        ...prevTerms,
        [term]: !prevTerms[term],
      }
      onTermsUpdate(updatedTerms)
      return updatedTerms
    })
  }

  return (
    <div className={cx('termsAndConditions')}>
      <div className={cx('totalAgree')}>
        <span className={cx('selectAllOption')}>
          <input
            type="checkbox"
            checked={selectAllTerms}
            onChange={handleSelectAgreeAll}
            id="selectAllTerms"
          />
          {selectAllTerms ? <IconCheck fill="var(--blue400)" /> : null}
        </span>
        <label htmlFor="selectAllTerms" className={cx('checkboxLabel')}>
          <strong>전체 약관 동의</strong>
        </label>
      </div>
      <ul>
        {terms.map(({ key, label }) => (
          <li key={key}>
            <div className={cx('selectItem')}>
              <div className={cx('checkbox')}>
                <span>
                  <input
                    type="checkbox"
                    checked={termsAgreed[key]}
                    onChange={() => handleSelectTerm(key)}
                  />
                  {termsAgreed[key] && <IconCheck fill="var(--blue400)" />}
                </span>
                <label htmlFor=""></label>
              </div>
              <button type="button" className={cx('labelBtn')}>
                <span>{label}</span>
                <div className={cx('arrowBox')}>
                  <IconArrow
                    width={18}
                    height={18}
                    className={cx('iconArrow')}
                  />
                </div>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TermsAndConditions
