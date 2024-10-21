class NotesItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  set notes(value) {
    this._notes = value;

    // Update the existing content without emptying it
    this._shadowRoot.querySelector('h2').textContent = this._notes.title;
    this._shadowRoot.querySelector('p').textContent = this._notes.body;
  }

  get notes() {
    return this._notes;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        border-radius: 8px;

        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
        overflow: hidden;
      }

      .notes-info {
        padding: 16px 24px;
      }

      .notes-info__title h2 {
        font-weight: lighter;
      }

      .notes-info__description p {
        display: -webkit-box;
        margin-top: 10px;

        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5; /* number of lines to show */
      }
    `;
  }

  render() {
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="card">
        <div class="notes-info">
          <div class="notes-info_title">
            <h2>${this._notes.title}</h2>
          </div>

          <div class="notes-info_body">
            <p>${this._notes.body}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('notes-item', NotesItem);