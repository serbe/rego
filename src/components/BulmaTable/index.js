import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import BulmaIcon from 'components/BulmaIcon';

export default class BulmaTable extends Component {
	static defaultProps = {
    classes: '',
		text: '',
		color: '',
		size: '',
		outlined: false,
		inverted: false,
		rounded: false,
		hovered: false,
		focused: false,
		active: false,
		loading: false,
		static: false,
		disabled: false
	};

	static propTypes = {
    classes: PropTypes.string,
		text: PropTypes.string,
		color: PropTypes.string,
		size: PropTypes.string,
		outlined: PropTypes.bool,
		inverted: PropTypes.bool,
		rounded: PropTypes.bool,
		hovered: PropTypes.bool,
		focused: PropTypes.bool,
		active: PropTypes.bool,
		loading: PropTypes.bool,
		static: PropTypes.bool,
		disabled: PropTypes.bool
	};

	render() {
    let buttonClass = 'button';
    if (!!this.props.classes) {
      buttonClass = `${this.props.classes} ${buttonClass}`;
    }
		if (!!this.props.color) {
			buttonClass = `${buttonClass} is-${this.props.color}`;
		}
		if (!!this.props.size) {
			buttonClass = `${buttonClass} is-${this.props.size}`;
		}
		if (this.props.outlined) {
			buttonClass = `${buttonClass} is-outlined`;
		}
		if (this.props.inverted) {
			buttonClass = `${buttonClass} is-inverted`;
    }
    if (this.props.rounded) {
			buttonClass = `${buttonClass} is-rounded`;
    }
    if (this.props.hovered) {
			buttonClass = `${buttonClass} is-hovered`;
    }
    if (this.props.focused) {
			buttonClass = `${buttonClass} is-focused`;
    }
    if (this.props.active) {
			buttonClass = `${buttonClass} is-active`;
    }
    if (this.props.loading) {
			buttonClass = `${buttonClass} is-loading`;
    }
    if (this.props.static) {
			buttonClass = `${buttonClass} is-static`;
    }
    if (this.props.rounded) {
			buttonClass = `${buttonClass} is-rounded`;
		}

		let IconButton;
		if (!!this.props.icon) {
			IconButton = (
				<BulmaIcon
					size={this.props.size}
					icon={this.props.icon}
					position={this.props.iconPosition}
					color={this.props.color}
				/>
			);
		}

		let ButtonText;
		if (!!this.props.text) {
			ButtonText = <React.Fragment>{this.props.text}</React.Fragment>;
		}

		return (
      <React.Fragment>
        <nav v-if="adding" class="level is-mobile" key="TableNav">
          <div class="level-left">
            <p class="level-item">
              <a class="button" :href="'/' + this.name + '/0'">Добавить</a>
            </p>
          </div>
          <div class="level-rigth">
            <p class="level-item">
              <span class="select">
                <select v-model="rowsSelect">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </span>
            </p>
          </div>
        </nav>
        <p class="control mb1" v-if="search" key="TableSearch">
          <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
        </p>
        <bulma-pagination v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="filter" key="TablePaginationTop" size="small"></bulma-pagination>
        <table
          class="table center-table"
          :class="tableClass">
          <thead v-if="headClasses" key="TableThead">
            <tr>
              <th v-for="(name, index) in head" :key="index" :class="headClass(index)">{{ name }}</th>
            </tr>
          </thead>
          <tbody v-if="rows.length" key="TableBody">
            <template v-if="hyper">
              <template v-for="(row, key) in rows">
                <tr :key="key" @click="onClickTr(row)" class="link">
                  <bulma-table-tr v-for="(name, index) in body" :key="index" :class="cellClass(index)" :type="cellType(index)" :value="row[name]"/>
                </tr>
              </template>
            </template>
            <template v-else>
              <template v-for="(row, key) in rows">
                <tr :key="key">
                  <bulma-table-tr v-for="(name, index) in body" :key="index" :class="cellClass(index)" :type="cellType(index)" :value="row[name]"/>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <bulma-pagination v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="filter" key="TablePaginationBottom" size="small"></bulma-pagination>
      </React.Fragment>
		);
	}
}
