import { LitElement, html, css, svg } from 'lit-element';
import { classMap } from "lit-html/directives/class-map";
import { closePopUp } from 'card-tools/src/popup';
import { computeStateDisplay, computeStateName } from 'custom-card-helpers';

class ThermostatPopupCard extends LitElement {
  config: any;
  hass: any;
  shadowRoot: any;

  static get properties() {
    return {
      hass: {},
      config: {},
      active: {}
    };
  }
  
  constructor() {
    super();
  }
  
  render() {
    var entity = this.config.entity;
    var stateObj = this.hass.states[entity];
    var icon = this.config.icon ? this.config.icon : stateObj.attributes.icon ? stateObj.attributes.icon: 'mdi:lightbulb';
    var fullscreen = "fullscreen" in this.config ? this.config.fullscreen : true;


    return html`
      <div class="${fullscreen === true ? 'popup-wrapper':''}">
        <div class="popup-inner" @click="${e => this._close(e)}">
          <div class="info${fullscreen === true ? ' fullscreen':''}">

          </div>
        </div>
      </div>
    `;
  }
  
  updated() { }

  _close(event) {
      if(event && event.target.className.includes('popup-inner')) {
          closePopUp();
      }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
        :host {

        }
        .popup-wrapper {
          margin-top:64px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .popup-inner {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .fullscreen {
          margin-top:-64px;
        }
        .info {
          display:flex;
          flex-direction:row;
          margin-bottom: 40px;
        }
    `;
  }
}