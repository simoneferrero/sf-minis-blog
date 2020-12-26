import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Button from '../Button'

const StyledSection = styled.section`
  ${({ theme }) => css`
    margin: ${theme.spacing['8']} 0;

    button {
      text-align: center;
      width: 100%;

      h2 {
        color: ${theme.color.heading};
        margin: 0;
      }

      small {
        font-style: italic;
      }
    }
  `}
`

const StyledTable = styled.table`
  ${({ theme }) => css`
    border-collapse: separate;
    border-spacing: ${theme.spacing['2']} 0;

    .table-row {
      .table-cell {
        padding-top: ${theme.spacing['2']};

        &.section {
          color: ${theme.color.primary};
          font-weight: ${theme.font.weight.bold};
          margin-right: ${theme.spacing['2']};
          width: 120px;
        }

        &.colors {
          font-size: ${theme.font.size[0]};
          font-style: italic;
        }
      }

      &:not(:last-child) {
        .table-cell {
          border-bottom: 1px solid ${theme.color.primary};
          padding-bottom: ${theme.spacing['2']};
        }
      }
    }
  `}
`

const ColorsDropdown = ({ colors }) => {
  if (!colors) return null

  const [isOpen, setIsOpen] = useState(false)

  return (
    <StyledSection title="Miniature colors">
      <Button onClick={() => setIsOpen(!isOpen)}>
        <h2>Colors</h2>
        <small>({!isOpen ? '↓ Expand ↓' : '↑ Collapse ↑'})</small>
      </Button>
      <StyledTable className="table" hidden={!isOpen}>
        <tbody>
          {Object.entries(colors).map(([section, colors]) => (
            <tr className="table-row" key={section}>
              <td className="table-cell section">{section}</td>
              <td className="table-cell colors">{colors.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledSection>
  )
}

ColorsDropdown.propTypes = {
  colors: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ),
}

export default ColorsDropdown
