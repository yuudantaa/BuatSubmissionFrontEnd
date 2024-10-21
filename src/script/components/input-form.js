class InputForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _submitEvent = 'submit'; 

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector('form')
      .addEventListener('submit', this._onFormSubmit.bind(this));
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector('form')
      .removeEventListener('submit', this._onFormSubmit);
  }

  _onFormSubmit(event) {
    event.preventDefault();
  
    const title = this._shadowRoot.querySelector('input#title').value;
    const body = this._shadowRoot.querySelector('input#body').value;

    this.dispatchEvent(
    new CustomEvent('inputNotes', {
      detail: { title, body },
      bubbles: true,
    })
  );

    // Optionally clear input fields after submit
    this._shadowRoot.querySelector('input#title').value = '';
    this._shadowRoot.querySelector('input#body').value = '';
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: inline;
      }

      .floating-form {
        background-color: white;
        padding: 16px;
        border-radius: 5px;

        position: sticky;
        top: 10px;

        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      }

      .input-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .input-form .form-group {
        flex-grow: 1;
        position: relative;
      }

      .input-form .form-group input {
        display: block;
        width: 100%;
        height: 60px;
        padding: 14px 10px 0 10px;
        border-inline: none;
        border-block-start: none;
        border-block-end: 1px solid cornflowerblue;
        font-size: 1rem;
      }

      .input-form .form-group input:focus-visible {
        outline: 0;
      }

      .input-form .form-group label {
        line-height: 60px;
        font-size: 1em;
        font-weight: 700;
        text-transform: uppercase;
        color: cornflowerblue;
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: 20px;
        user-select: none;
        pointer-events: none;
        transition: 150ms all ease-in-out;
      }

      .input-form .form-group input:focus-visible ~ label,
      .input-form .form-group input:valid ~ label {
        left: 10px;
        top: -16px;
        font-size: 0.8em;
      }

      .input-form button {
        border: 0;
        padding-inline: 24px;
        background-color: cornflowerblue;
        text-transform: uppercase;
        font-size: 1rem;
        color: white;
        cursor: pointer;
        transition: 100ms linear;
      }

      .input-form button:hover {
        background-color: #4485ff;
      }

      .input-form button:active {
        background-color: #6c9aee;
      }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="floating-form">
        <form id="inputForm" class="input-form">
          <div class="form-group">
            <input id="title" name="title" type="text" placeholder="Title">
            <label for="title">Title</label>
          </div>
          <div class="form-group">
            <input id="body" name="body" type="text" placeholder="Body">
            <label for="body">Body</label>
          </div>
          <button>submit</button>
        </form>
      </div>
    `;
  }
}

customElements.define('input-form', InputForm);