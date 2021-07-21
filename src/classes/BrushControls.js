var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BloodNGuts } from "../blood-n-guts.js";
export default class BrushControls extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['form'],
            closeOnSubmit: false,
            submitOnChange: true,
            submitOnClose: true,
            popOut: false,
            editable: game.user.isGM,
            template: 'modules/blood-n-guts/templates/brush-controls.html',
            id: 'brush-controls',
            title: "Blood 'n Guts Brush Settings",
        });
    }
    /* -------------------------------------------- */
    /**
     * Obtain brush settings and merge with loaded fonts
     * @category Foundry
     * @function
     * @async
     * @returns {Promise<BrushSettings>} - The data provided to the template when rendering the form
     * @override
     * @see {FormApplication#getData}
     */
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield BloodNGuts.allFontsReady;
            return mergeObject(canvas.blood.brushSettings, { fonts: BloodNGuts.allFonts });
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
    }
    /**
     * This method is called upon form submission after form data is validated.
     * @category Foundry
     * @function
     * @async
     * @param {Event} _event - The initial triggering submission event
     * @param {BrushSettings} formData - The object of validated form data with which to update the object
     * @override
     * @see {FormApplication#_updateObject}
     */
    _updateObject(_event, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = diffObject(canvas.blood.brushSettings, formData);
            Object.entries(updated).map(([name, val]) => {
                canvas.blood.setSetting(false, name, val);
            });
            // update brush controls html
            this.render();
        });
    }
}
