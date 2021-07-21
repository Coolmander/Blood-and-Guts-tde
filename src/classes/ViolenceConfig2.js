var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MODULE_ID } from "../constants.js";
export default class ViolenceConfig2 extends FormApplication {
    constructor(violenceLevel, options) {
        super(violenceLevel, options);
        this.currentLevel = violenceLevel || game.settings.get(MODULE_ID, 'violenceLevel');
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['form'],
            closeOnSubmit: true,
            submitOnChange: false,
            submitOnClose: false,
            popOut: true,
            editable: game.user.isGM,
            width: 350,
            template: 'modules/blood-n-guts/templates/violence-config2.html',
            id: 'violence-config',
            title: "Blood 'n Guts Violence Settings",
        });
    }
    /* -------------------------------------------- */
    /**
     * Obtain settings data and return to the FormApplication
     * @category Foundry
     * @function
     * @async
     * @returns {BrushSettings} - The data provided to the template when rendering the form
     * @override
     * @see {FormApplication#getData}
     */
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            // Return data to the template
            let violenceLevel;
            if (this.currentLevel === 'New') {
                this.currentLevel = '';
                violenceLevel = {};
            }
            else {
                violenceLevel =
                    canvas.scene.getFlag(MODULE_ID, 'violenceLevels') != null &&
                        canvas.scene.getFlag(MODULE_ID, 'violenceLevels')[this.currentLevel] != null
                        ? canvas.scene.getFlag(MODULE_ID, 'violenceLevels')[this.currentLevel]
                        : game.settings.get(MODULE_ID, 'violenceLevels')[this.currentLevel];
            }
            this.dataObject = {
                currentLevel: this.currentLevel,
                violenceLevel: violenceLevel,
                nameInputDisabled: true,
            };
            return this.dataObject;
        });
    }
    /* -------------------------------------------- */
    /*  Event Listeners and Handlers                */
    /* -------------------------------------------- */
    /**
     * Activate listeners on the form.
     * @category Foundry
     * @function
     * @param {JQuery} html - the form html
     * @override
     * @see {FormApplication#activateListeners}
     */
    activateListeners(html) {
        super.activateListeners(html);
        const form = document.querySelector('form#violenceConfigForm');
        const nameInput = html.find('input#currentLevel');
        const formFields = html.find('input[type=number]');
        const cancelButton = html.find('button#cancelButton');
        if (this.currentLevel === '') {
            formFields.prop('disabled', true);
            nameInput.on('change', (event) => {
                this.currentLevel = event.target.value;
                if (this.currentLevel.length > 3)
                    formFields.prop('disabled', false);
                else
                    formFields.prop('disabled', true);
            });
        }
        else
            nameInput.prop('disabled', true);
        formFields.on('change', (event) => {
            return canvas.scene.setFlag(MODULE_ID, 'violenceLevels.' + event.target.id, event.target.id);
        });
        cancelButton.click((e) => {
            this.close();
        });
    }
    /**
     * This method is called upon form submission after form data is validated.
     * @category Foundry
     * @function
     * @async
     * @param {SubmitEvent} event - The initial triggering submission event
     * @param {BrushSettings} formData - The object of validated form data with which to update the object
     * @override
     * @see {FormApplication#_updateObject}
     */
    _updateObject(event, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            return;
        });
    }
}
