var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class BloodConfig extends FormApplication {
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
     * Obtain module metadata and merge it with game settings which track current module visibility
     * @return {Object}   The data provided to the template when rendering the form
     */
    getData() {
        // Return data to the template
        return canvas.blood.brushSettings;
    }
    /* -------------------------------------------- */
    /*  Event Listeners and Handlers                */
    /* -------------------------------------------- */
    /**
     * This method is called upon form submission after form data is validated
     * @param event {Event}       The initial triggering submission event
     * @param formData {Object}   The object of validated form data with which to update the object
     * @private
     */
    _updateObject(event, formData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // drop the #
            //formData.brushRGBA = hexToRGBAString(formData.brushColor.slice(1), formData.brushAlpha);
            Object.entries(formData).forEach(([name, val]) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                const saveToFlag = ((_b = event.submitter) === null || _b === void 0 ? void 0 : _b.name) === 'saveDefaults';
                yield canvas.blood.setSetting(saveToFlag, name, val);
            }));
            canvas.blood.brushControls.render();
            // If save button was clicked, close app
            if (((_a = event.submitter) === null || _a === void 0 ? void 0 : _a.name) === 'submit') {
                Object.values(ui.windows).forEach((val) => {
                    if (val.id === 'blood-blood-config')
                        val.close();
                });
            }
        });
    }
}
