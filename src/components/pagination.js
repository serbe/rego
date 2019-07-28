import React, {useState} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(this.props.currentPage);

    let maxNumber = () => {
      if (this.props.len % this.props.maxRows === 0) {
        return (this.props.len / this.props.maxRows) | 0;
      }
      return ((this.props.len / this.props.maxRows) | 0) + 1;
    };

    let value = () => {
      if (this.state.page > this.props.max) {
        this.paginationClick(this.props.max);
      }
      return this.state.page;
    };

    const navClasses = clsx([
      "pagination",
      "is-centered",
      {
        [`is-${this.props.size}`]: this.props.size,
      }
    ]);

    return (
      <nav v-if="max > 1" ref="pagination" className={navClasses} key="Pagination">
        <a className="pagination-previous" v-if="value > 1" onClick="onClick(value - 1)" key="PaginationPrev">Назад</a>
        <a className="pagination-next" v-if="value < max" onClick="onClick(value + 1)" key="PaginationNext">Далее</a>
        <ul className="pagination-list">
          <li v-if="value !== 1" key="li1">
            <a className="pagination-link" onClick="onClick(1)">1</a>
          </li>
          <li v-if="value > 3" key="li2">
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-if="value > 2" key="li3">
            <a className="pagination-link" onClick="onClick(value - 1)">{ value - 1 }</a>
          </li>
          <li>
            <a className="pagination-link is-current">{{ value }}</a>
          </li>
          <li v-if="value < max - 1" key="li4">
            <a className="pagination-link" onClick="onClick(value + 1)">{ value + 1 }</a>
          </li>
          <li v-if="value < max - 2" key="li5">
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-if="value != max" key="li6">
            <a className="pagination-link" onClick="onClick(max)">{ this.props.max }</a>
          </li>
        </ul>
      </nav>
    );
}

Pagination.propTypes = {
  len: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired,
  size: PropTypes.oneOf(["small", "normal", "medium", "large"]),
};

// Pagination.defaultProps = {
//   len: 0,
//   currentPage: 0,
//   maxRows: 0
//   // size: '',
// };

export default Pagination;
