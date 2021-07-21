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
import * as violenceLevelSettings from "../data/violenceLevelSettings.js";
import { BnGAdvancedConfig } from "./BnGAdvancedConfig.js";
export default class ViolenceConfig extends FormApplication {
    constructor(violenceLevel, options) {
        super(violenceLevel, options);
        this.allViolenceLevels = game.settings.get(MODULE_ID, 'violenceLevels');
        if (violenceLevel === 'New') {
            this.currentLevel = '';
            this.newLevelMode = true;
            this.newViolenceLevel = {};
        }
        else {
            this.currentLevel = game.settings.get(MODULE_ID, 'masterViolenceLevel');
            this.newLevelMode = false;
            this.newViolenceLevel = duplicate(this.allViolenceLevels[this.currentLevel]);
            if (violenceLevelSettings.defaults[this.currentLevel] != null)
                this.defaultLevel = true;
        }
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
            template: 'modules/blood-n-guts/templates/violence-config.html',
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
     * @returns {Promise<Record<string, unknown>>} - The data provided to the template when rendering the form
     * @override
     * @see {FormApplication#getData}
     */
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            // Return data to the template
            let violenceLevel, nameInputDisabled, resetButtonDisabled;
            if (this.newLevelMode) {
                violenceLevel = {};
                nameInputDisabled = '';
            }
            else {
                this.allViolenceLevels = game.settings.get(MODULE_ID, 'violenceLevels');
                violenceLevel = this.allViolenceLevels[this.currentLevel];
                nameInputDisabled = 'disabled';
            }
            if (this.defaultLevel)
                if (isObjectEmpty(diffObject(violenceLevel, violenceLevelSettings.defaults[this.currentLevel])))
                    resetButtonDisabled = 'disabled';
                else
                    resetButtonDisabled = '';
            return {
                name: this.currentLevel,
                violenceLevel: violenceLevel,
                nameInputDisabled: nameInputDisabled,
                notNewLevelMode: !this.newLevelMode,
                defaultLevel: this.defaultLevel,
                resetButtonDisabled: resetButtonDisabled,
            };
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
        const formFields = html.find('input[type=number]');
        const cancelButton = html.find('button#cancelButton');
        const resetButton = html.find('button#resetButton');
        const deleteButton = html.find('button#deleteButton');
        formFields.on('change', (event) => {
            const val = Number(event.target.value);
            this.newViolenceLevel[event.target.id] = val;
            if (!this.newLevelMode) {
                const diff = diffObject(this.newViolenceLevel, violenceLevelSettings.defaults[this.currentLevel]);
                if (isObjectEmpty(diff))
                    resetButton.prop('disabled', true);
                else
                    resetButton.prop('disabled', false);
                this.allViolenceLevels[this.currentLevel] = this.newViolenceLevel;
                return game.settings.set(MODULE_ID, 'violenceLevels', this.allViolenceLevels);
            }
        });
        cancelButton.on('click', () => {
            this.close();
        });
        resetButton.on('click', () => __awaiter(this, void 0, void 0, function* () {
            this.allViolenceLevels[this.currentLevel] = duplicate(violenceLevelSettings.defaults[this.currentLevel]);
            this.newViolenceLevel = duplicate(violenceLevelSettings.defaults[this.currentLevel]);
            yield game.settings.set(MODULE_ID, 'violenceLevels', this.allViolenceLevels);
            this.render();
        }));
        deleteButton.on('click', () => __awaiter(this, void 0, void 0, function* () {
            delete this.allViolenceLevels[this.currentLevel];
            yield game.settings.set(MODULE_ID, 'violenceLevels', this.allViolenceLevels);
            yield game.settings.set(MODULE_ID, 'masterViolenceLevel', 'Shrieker');
            // render the SettingsConfig/BnGAdvancedConfig if it is currently open to update changes
            Object.values(ui.windows).forEach((app) => {
                if (app instanceof SettingsConfig || app instanceof BnGAdvancedConfig)
                    app.render();
            });
            this.close();
        }));
    }
    /**
     * This method is called upon form submission after form data is validated.
     * @category Foundry
     * @function
     * @async
     * @param {SubmitEvent} event - The initial triggering submission event
     * @param {ViolenceLevel} formData - The object of validated form data with which to update the object
     * @override
     * @see {FormApplication#_updateObject}
     */
    _updateObject(event, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = formData.name || this.currentLevel;
            delete formData.name;
            this.allViolenceLevels[name] = formData;
            yield game.settings.set(MODULE_ID, 'masterViolenceLevel', name);
            yield game.settings.set(MODULE_ID, 'violenceLevels', this.allViolenceLevels);
            // render the SettingsConfig/BnGAdvancedConfig if it is currently open to update changes
            Object.values(ui.windows).forEach((app) => {
                if (app instanceof SettingsConfig || app instanceof BnGAdvancedConfig)
                    app.render();
            });
            return;
        });
    }
}
