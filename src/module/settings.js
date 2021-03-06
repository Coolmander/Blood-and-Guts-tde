var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BnGAdvancedConfig } from '../classes/BnGAdvancedConfig.js';
import { MODULE_ID } from "../constants.js";
import { log, LogLevel } from "./logging.js";
import * as bloodColorSettings from "../data/bloodColorSettings.js";
import * as violenceLevelSettings from "../data/violenceLevelSettings.js";
import { isFirstActiveGM } from './helpers.js';
/**
 * Registers settings.
 * @module Settings
 */
export const violenceLevelChoices = (violenceLevels) => {
    const choices = {};
    for (const level in violenceLevels) {
        choices[level] = level;
    }
    return choices;
};
/**
 * Register module settings.
 * @function
 */
export const registerSettings = () => {
    game.settings.register(MODULE_ID, 'useBloodColor', {
        name: 'Blood Color',
        hint: 'If unchecked all blood will be red',
        scope: 'world',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => {
            log(LogLevel.DEBUG, 'Settings: useBloodColor set to ' + value);
        },
    });
    game.settings.register(MODULE_ID, 'halfHealthBloodied', {
        name: '50% Health = Bloodied',
        hint: 'Common house rule to show bleeding effects at 50% of max health',
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            log(LogLevel.DEBUG, 'Settings: halfHealthBloodied set to ' + value);
            game.settings.set(MODULE_ID, 'healthThreshold', 0.5);
            game.settings.set(MODULE_ID, 'damageThreshold', 0);
        },
    });
    game.settings.register(MODULE_ID, 'system', {
        scope: 'world',
        config: false,
        onChange: (value) => {
            log(LogLevel.DEBUG, 'Settings: system set to ' + value);
        },
    });
    // Advanced Configuration
    game.settings.registerMenu(MODULE_ID, 'advancedConfig', {
        name: 'Advanced Config',
        label: 'Advanced Configuration',
        hint: 'Access advanced configuration menu to find additional options',
        icon: 'fas fa-desktop',
        type: BnGAdvancedConfig,
        restricted: true,
    });
    game.settings.register(MODULE_ID, 'floorSplatFont', {
        scope: 'world',
        config: false,
        type: String,
        default: 'splatter',
        onChange: (value) => {
            log(LogLevel.DEBUG, 'Settings: floorSplatFont set to ' + value);
        },
    });
    game.settings.register(MODULE_ID, 'tokenSplatFont', {
        scope: 'world',
        config: false,
        type: String,
        default: 'splatter',
        onChange: (value) => {
            log(LogLevel.DEBUG, 'Settings: tokenSplatFont set to ' + value);
        },
    });
    game.settings.register(MODULE_ID, 'trailSplatFont', {
        scope: 'world',
        config: false,
        type: String,
        default: 'WC Rhesus A Bta',
        onChange: (value) => {
            log(LogLevel.DEBUG, 'Settings: trailSplatFont set to ' + value);
        },
    });
    game.settings.register(MODULE_ID, 'masterViolenceLevel', {
        name: game.i18n.localize('Master Violence Level'),
        hint: game.i18n.localize('Blood and gore level'),
        scope: 'client',
        config: true,
        type: String,
        choices: violenceLevelChoices(violenceLevelSettings.defaults),
        default: 'Kobold',
        onChange: (value) => {
            log(LogLevel.DEBUG, 'masterViolenceLevel set to:', value);
            if (isFirstActiveGM())
                return canvas.scene.setFlag(MODULE_ID, 'sceneViolenceLevel', value);
            else if (canvas.scene.getFlag(MODULE_ID, 'sceneViolenceLevel') != 'Disabled')
                canvas.draw();
        },
    });
    game.settings.register(MODULE_ID, 'violenceLevels', {
        scope: 'world',
        config: false,
        default: violenceLevelSettings.defaults,
        onChange: (value) => {
            log(LogLevel.DEBUG, 'Settings: violenceLevels set to ' + value);
        },
    });
    game.settings.register(MODULE_ID, 'bloodColors', {
        scope: 'world',
        config: false,
        default: bloodColorSettings.colors,
        onChange: (value) => {
            log(LogLevel.DEBUG, 'Settings: bloodColorSettings set to ' + value);
        },
    });
};
// Custom Settings
/**
 * Promise resolving after base token settings are generated
 * @function
 * @category GMOnly
 * @returns {Promise<any>} - promise resolving to token settings
 */
export const getBaseTokenSettings = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let baseSettings = {};
    baseSettings.tokenViolenceLevel = token.getFlag(MODULE_ID, 'masterViolenceLevel');
    if (baseSettings.tokenViolenceLevel) {
        if (game.settings.get(MODULE_ID, 'violenceLevels')[baseSettings.tokenViolenceLevel] == null) {
            log(LogLevel.WARN, 'getBaseTokenSettings, violenceLevel no longer exists', baseSettings.tokenViolenceLevel);
            token.unsetFlag(MODULE_ID, 'tokenViolenceLevel');
            delete baseSettings.tokenViolenceLevel;
        }
        else {
            baseSettings = Object.assign(baseSettings, game.settings.get(MODULE_ID, 'violenceLevels')[baseSettings.tokenViolenceLevel]);
        }
    }
    baseSettings.bloodColor = token.getFlag(MODULE_ID, 'bloodColor');
    baseSettings.floorSplatFont = token.getFlag(MODULE_ID, 'floorSplatFont');
    baseSettings.tokenSplatFont = token.getFlag(MODULE_ID, 'tokenSplatFont');
    baseSettings.trailSplatFont = token.getFlag(MODULE_ID, 'trailSplatFont');
    return baseSettings;
});
