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
export default class BrushConfig extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['form'],
            closeOnSubmit: false,
            submitOnChange: false,
            submitOnClose: true,
            popOut: true,
            editable: game.user.isGM,
            width: 500,
            template: 'modules/blood-n-guts/templates/brush-config.html',
            id: 'brush-config',
            title: "Blood 'n Guts Brush Settings",
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
        // Return data to the template
        return canvas.blood.brushSettings;
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
        const resetButton = html.find('.brush-config-reset-defaults');
        resetButton.click(() => {
            Object.keys(canvas.blood.brushSettings).forEach((name) => __awaiter(this, void 0, void 0, function* () {
                yield canvas.scene.unsetFlag(MODULE_ID, name);
                canvas.blood.brushSettings = duplicate(canvas.blood.DEFAULTS_BRUSHSETTINGS);
            }));
            this.render();
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = event.submitter) === null || _a === void 0 ? void 0 : _a.name) {
                Object.entries(formData).forEach(([name, val]) => __awaiter(this, void 0, void 0, function* () {
                    var _c;
                    const saveToFlag = ((_c = event.submitter) === null || _c === void 0 ? void 0 : _c.name) === 'saveDefaults';
                    yield canvas.blood.setSetting(saveToFlag, name, val);
                }));
                canvas.blood.brushControls.render();
                // If save button was clicked, close app
                if (((_b = event.submitter) === null || _b === void 0 ? void 0 : _b.name) === 'submit') {
                    Object.values(ui.windows).forEach((val) => {
                        if (val.id === 'brush-config')
                            val.close();
                    });
                }
            }
            else {
                // close button was clicked, close without doing anything
                Object.values(ui.windows).forEach((val) => {
                    if (val.id === 'brush-config')
                        val.close();
                });
            }
        });
    }
}
