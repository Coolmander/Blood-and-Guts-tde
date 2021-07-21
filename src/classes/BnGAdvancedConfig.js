var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { log, LogLevel } from "../module/logging.js";
import { MODULE_ID } from "../constants.js";
import { BloodNGuts } from "../blood-n-guts.js";
import { getHexColor, isFirstActiveGM } from "../module/helpers.js";
import ViolenceConfig from "./ViolenceConfig.js";
/**
 * FormApplication window for advanced configuration options.
 * @class
 * @extends FormApplication
 */
export class BnGAdvancedConfig extends FormApplication {
    constructor(object, options) {
        super(object, options);
        game.settings.sheet.close();
        game.users.apps.push(this);
        this.dataObject = {};
    }
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.title = 'Configure Blood n Guts Advanced Settings';
        options.id = MODULE_ID;
        options.template = 'modules/blood-n-guts/templates/advanced-config.html';
        options.closeOnSubmit = true;
        options.popOut = true;
        options.width = 600;
        options.height = 'auto';
        return options;
    }
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
            this.dataObject['fonts'] = BloodNGuts.allFonts;
            this.dataObject['floorSplatFont'] = game.settings.get(MODULE_ID, 'floorSplatFont');
            this.dataObject['tokenSplatFont'] = game.settings.get(MODULE_ID, 'tokenSplatFont');
            this.dataObject['trailSplatFont'] = game.settings.get(MODULE_ID, 'trailSplatFont');
            this.dataObject['currentLevel'] = game.settings.get(MODULE_ID, 'masterViolenceLevel');
            const violenceLevelChoices = {};
            for (const level in game.settings.get(MODULE_ID, 'violenceLevels')) {
                violenceLevelChoices[level] = level;
            }
            this.dataObject['levels'] = violenceLevelChoices;
            return this.dataObject;
        });
    }
    /**
     * Calls `super.render()` - not entirely sure why it's needed.
     * @category Foundry
     * @function
     * @param {boolean} force
     * @param context
     * @returns {Application}
     * @override
     * @see {FormApplication#render}
     */
    render(force, context = {}) {
        return super.render(force, context);
    }
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
        const wipeButton = html.find('.advanced-config-wipe-scene-splats');
        wipeButton.click(() => {
            log(LogLevel.DEBUG, 'wipeButton: BloodNGuts.wipeScene()');
            BloodNGuts.wipeScene(isFirstActiveGM());
            // this will wipe any DOM splats created by splatButton
            $('.splat-container').remove();
        });
        const splatButton = html.find('.advanced-config-splat-window');
        const appWindow = html.closest('.app.window-app.form#blood-n-guts');
        splatButton.click(() => {
            log(LogLevel.DEBUG, 'splatButton: BloodNGuts.drawDOMSplats()');
            BloodNGuts.drawDOMSplats(appWindow[0], BloodNGuts.allFonts[game.settings.get(MODULE_ID, 'tokenSplatFont')], 250, 4, getHexColor('blood'));
        });
        const editButton = html.find('button#editButton');
        const newButton = html.find('button#newButton');
        editButton.on('click', () => {
            new ViolenceConfig().render(true);
        });
        newButton.on('click', () => {
            new ViolenceConfig('New').render(true);
        });
        const violenceSelect = html.find('select#currentLevel');
        violenceSelect.on('change', (event) => {
            game.settings.set(MODULE_ID, 'masterViolenceLevel', event.target.value);
        });
    }
    /**
     * This method is called upon form submission after form data is validated.
     * @category Foundry
     * @function
     * @async
     * @param {Event} _event - The initial triggering submission event
     * @param {Record<string, unknown>} formData - The object of validated form data with which to update the object
     * @override
     * @see {FormApplication#_updateObject}
     */
    _updateObject(_event, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            delete formData.currentLevel;
            for (const setting in formData) {
                game.settings.set(MODULE_ID, setting, formData[setting]);
            }
        });
    }
}
