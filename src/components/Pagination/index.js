import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BulmaPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.currentPage,
    };
  }

  static defaultProps = {
    len: 0,
		currentPage: 0,
		maxRows: 0,
		size: '',
	};

	static propTypes = {
    len: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
		maxRows: PropTypes.number.isRequired,
		size: PropTypes.string,
  };

	render() {
    let maxNumber = () => {
      if (this.props.len % this.props.maxRows === 0) {
        return this.props.len / this.props.maxRows | 0
      }
      return (this.props.len / this.props.maxRows | 0) + 1
    }

    let value = () => {
      if (this.state.page > this.props.max) {
        this.paginationClick(this.props.max)
      }
      return this.state.page
    }

		return (
      <nav class="pagination is-centered" v-if="max > 1" ref="pagination" :class="sizeClass" key="Pagination">
        <a class="pagination-previous" v-if="value > 1" @click="onClick(value - 1)" key="PaginationPrev">Назад</a>
        <a class="pagination-next" v-if="value < max" @click="onClick(value + 1)" key="PaginationNext">Далее</a>
        <ul class="pagination-list">
          <li v-if="value !== 1" key="li1">
            <a class="pagination-link" @click="onClick(1)">1</a>
          </li>
          <li v-if="value > 3" key="li2">
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-if="value > 2" key="li3">
            <a class="pagination-link" @click="onClick(value - 1)">{{ value - 1 }}</a>
          </li>
          <li>
            <a class="pagination-link is-current">{{ value }}</a>
          </li>
          <li v-if="value < max - 1" key="li4">
            <a class="pagination-link" @click="onClick(value + 1)">{{ value + 1 }}</a>
          </li>
          <li v-if="value < max - 2" key="li5">
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-if="value != max" key="li6">
            <a class="pagination-link" @click="onClick(max)">{{ max }}</a>
          </li>
        </ul>
      </nav>
		);
	}
}
