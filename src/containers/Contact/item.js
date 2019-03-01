import React, { Component } from "react";
// import { Link } from "react-router-dom";

export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      contacts: [],
      departments: [],
      error: null,
      id: this.props.match.params.contact,
      isLoaded: false,
      posts: [],
      posts_go: [],
      ranks: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9090/edds/api/contacts/${this.state.id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            contacts: result.contacts
          });
        },
        error => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const [
      contact,
      contacts,
      departments,
      error,
      id,
      isLoaded,
      posts,
      posts_go,
      ranks
    ] = this.state;

    return (
      <div class="container">
      {/* <form id="contact">
        <bulma-input
          v-model="contact.name"
          label
          placeholder="Полное имя"
          iconLeft="user"
        ></bulma-input>

        <bulma-select
          :list="companies"
          :selected-item="contact.company"
          label="Организация"
          item-name="company"
          @select="onSelect"
          iconLeft="building"
        ></bulma-select>

        <div class="columns">
          <div class="column is-half">
            <bulma-select
              :list="posts"
              :selected-item="contact.post"
              label="Должность"
              item-name="post"
              @select="onSelect"
              iconLeft="tag"
            ></bulma-select>
          </div>

          <div class="column is-half">
            <bulma-select
              :list="departments"
              :selected-item="contact.department"
              label="Отдел"
              item-name="department"
              @select="onSelect"
              iconLeft="tag"
            ></bulma-select>
          </div>
        </div>

        <div class="columns">
          <div class="column is-half">
            <bulma-select
              :list="posts_go"
              :selected-item="contact.post_go"
              label="Должность ГО"
              item-name="post_go"
              @select="onSelect"
              iconLeft="tag"
            ></bulma-select>
          </div>

          <div class="column is-half">
            <bulma-select
              :list="ranks"
              :selected-item="contact.rank"
              label="Звание"
              item-name="rank"
              @select="onSelect"
              iconLeft="tag"
            ></bulma-select>
          </div>
        </div>

        <div class="columns">
          <div class="column is-one-third">
            <bulma-date
              v-model="contact.birthday"
              label="Дата рождения"
            ></bulma-date>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Электронный адрес</label>
              <bulma-input
                v-for="(email, index) in contact.emails"
                :key="index"
                v-model="contact.emails[index].email"
                type="email"
                placeholder="Электронный адрес"
                iconLeft="envelope"
                autocomplete="email"
                @blur="onBlur('emails', 'email')"
                pattern="pattern"
                error="Неправильный email"
              ></bulma-input>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Телефон</label>
              <bulma-input
                v-for="(phone, index) in contact.phones"
                :key="index"
                v-model="contact.phones[index].phone"
                type="tel"
                placeholder="Телефон"
                iconLeft="phone"
                autocomplete="tel"
                @blur="onBlur('phones', 'phone')"
              ></bulma-input>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Факс</label>
              <bulma-input
                v-for="(fax, index) in contact.faxes"
                :key="index"
                v-model="contact.faxes[index].phone"
                type="tel"
                placeholder="Факс"
                iconLeft="fax"
                autocomplete="tel"
                @blur="onBlur('faxes', 'phone')"
              ></bulma-input>
            </div>
          </div>
        </div>

        <div class="field" v-if="contact.practices" key="practices">
          <label class="label">Тренировки</label>
          <bulma-input
            v-for="practice in contact.practices"
            :key="practice.id"
            :hyper="'/practice/' + practice.id"
            readonly
            :value="
              practice.date_str +
                ' - ' +
                practice.kind.name +
                ' - ' +
                practice.topic
            "
            iconLeft="graduation-cap"
          ></bulma-input>
        </div>

        <bulma-input
          label="Заметка"
          placeholder="Заметка"
          iconLeft="comment"
          v-model="contact.note"
        ></bulma-input>

        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <bulma-button
              text="Сохранить"
              color="primary"
              @click="submit"
            ></bulma-button>
          </div>
          <div class="control">
            <bulma-button text="Закрыть" @click="close"></bulma-button>
          </div>
          <div class="control">
            <bulma-button
              text="Удалить"
              color="danger"
              onclick="return confirm('Вы действительно хотите удалить эту запись?');"
            ></bulma-button>
          </div>
        </div>
      </form> */}
    </div>
    );
  }
}
