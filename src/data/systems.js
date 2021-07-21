import { log, LogLevel } from "../module/logging.js";
// ['pf1', 'pf2e', , 'dcc', 'archmage'];
export default {
    // Toolkit13 (13th Age Compatible)
    archmage: {
        id: 'archmage',
        supportedTypes: ['character', 'npc'],
        currentHP: (token) => token.actor.data.data.attributes.hp.value,
        maxHP: (token) => token.actor.data.data.attributes.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token) => {
            var _a, _b;
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = (_a = token.actor.data.data.details.race) === null || _a === void 0 ? void 0 : _a.value;
            }
            else if (actorType === 'npc') {
                creatureType = (_b = token.actor.data.data.details.type) === null || _b === void 0 ? void 0 : _b.value;
            }
            log(LogLevel.DEBUG, 'creatureType archmage: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    dcc: {
        id: 'dcc',
        supportedTypes: ['player', 'npc'],
        currentHP: (token) => token.actor.data.data.attributes.hp.value,
        maxHP: (token) => token.actor.data.data.attributes.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token, bloodColorSettings) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'player') {
                creatureType = token.actor.data.data.details.sheetClass;
            }
            else if (actorType === 'npc') {
                // DCC does not have monster types so the best we can do is try to get it from the npc's name
                const wordsInName = token.actor.data.name.toLowerCase().split(' ');
                for (let i = 0; i < wordsInName.length; i++) {
                    const word = wordsInName[i].toLowerCase();
                    if (bloodColorSettings[word])
                        return word;
                }
            }
            log(LogLevel.DEBUG, 'creatureType dcc: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    demonlord: {
        id: 'demonlord',
        supportedTypes: ['character', 'creature'],
        currentHP(token) {
            const damage = token.actor.data.data.characteristics.health.value;
            return this.maxHP(token) - damage;
        },
        maxHP(token) {
            const max = token.actor.data.data.characteristics.health.max;
            const healthbonus = token.actor.data.data.characteristics.healthbonus;
            return max + healthbonus;
        },
        currentHPChange(changes) {
            var _a, _b, _c, _d;
            const damage = (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.characteristics) === null || _c === void 0 ? void 0 : _c.health) === null || _d === void 0 ? void 0 : _d.value;
            return this.maxHPChange(changes) - damage;
        },
        maxHPChange(changes) {
            var _a, _b, _c, _d, _e, _f;
            const max = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.characteristics) === null || _c === void 0 ? void 0 : _c.health.max;
            const healthbonus = (_f = (_e = (_d = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.characteristics) === null || _f === void 0 ? void 0 : _f.healthbonus;
            return max + healthbonus;
        },
        creatureType(token) {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.ancestry;
            }
            else if (actorType === 'creature') {
                creatureType = token.actor.data.data.descriptor;
            }
            log(LogLevel.DEBUG, 'creatureType demonlord: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
	dsa5: {
    id: 'dsa5',
    supportedTypes: ['character', 'npc', 'creature'],
    currentHP: (token): number => token.actor.data.data.status.wounds.value,
    maxHP: (token): number => token.actor.data.data.status.wounds.max,
    currentHPChange: (changes: Record<string, any>): number => changes?.actorData?.data?.status?.wounds?.value,
    maxHPChange: (changes: Record<string, any>): number => changes?.actorData?.data?.status?.wounds?.max,
    creatureType: (token): string | void => {
      const actorType: string = token.actor.data.type.toLowerCase();
      let creatureType: string;
      if (actorType === 'character' || actorType === 'npc') {
        creatureType = token.actor.data.data.details.species.value;
      } else if (actorType === 'creature') {
        creatureType = token.actor.data.data.creatureClass.value.split(",")[0].trim();
      }
      log(LogLevel.DEBUG, 'creatureType dsa5: ', token.name, actorType, creatureType);
      if (creatureType) return creatureType.toLowerCase();
    },
  },
    dnd5e: {
        id: 'dnd5e',
        supportedTypes: ['character', 'npc'],
        currentHP: (token) => token.actor.data.data.attributes.hp.value,
        maxHP: (token) => token.actor.data.data.attributes.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.details.race;
            }
            else if (actorType === 'npc') {
                creatureType = token.actor.data.data.details.type;
            }
            log(LogLevel.DEBUG, 'creatureType dnd5e: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    pf1: {
        id: 'pf1',
        supportedTypes: ['character', 'npc'],
        currentHP: (token) => token.actor.data.data.attributes.hp.value,
        maxHP: (token) => token.actor.data.data.attributes.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token) => {
            var _a, _b, _c, _d;
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                // @ts-expect-error bad definition
                creatureType = (_b = (_a = token.actor.data.items.find((i) => i.type === 'race')) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
            }
            else if (actorType === 'npc') {
                // @ts-expect-error bad definition
                creatureType = (_d = (_c = token.actor.data.items.find((i) => i.type === 'class')) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '';
            }
            log(LogLevel.DEBUG, 'creatureType pf1: ', token.name, actorType, creatureType);
            return creatureType.toLowerCase();
        },
    },
    pf2e: {
        id: 'pf2e',
        supportedTypes: ['character', 'npc', 'hazard', 'familiar'],
        currentHP: (token) => token.actor.data.data.attributes.hp.value,
        maxHP: (token) => token.actor.data.data.attributes.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token, bloodColorSettings) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.details.ancestry.value;
            }
            else if (actorType === 'familiar') {
                // familiars do not have a creatureType so the best we can do is this
                creatureType = token.actor.data.data.details.creature.value;
            }
            else if (actorType === 'npc' || actorType === 'hazard') {
                if (token.actor.data.data.traits.traits.value) {
                    // PF2E has an array of traits that represent creatureType
                    creatureType = token.actor.data.data.traits.traits.value[0];
                    for (let i = 0; i < token.actor.data.data.traits.traits.value.length; i++) {
                        const word = token.actor.data.data.traits.traits.value[i].toLowerCase();
                        if (bloodColorSettings[word])
                            creatureType = word;
                    }
                }
                else
                    creatureType = token.actor.data.data.details.creatureType;
            }
            log(LogLevel.DEBUG, 'creatureType pf2e: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    'uesrpg-d100': {
        id: 'uesrpg-d100',
        supportedTypes: ['character', 'npc'],
        currentHP: (token) => token.actor.data.data.hp.value,
        maxHP: (token) => token.actor.data.data.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.hp) === null || _c === void 0 ? void 0 : _c.value; },
        maxHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.hp) === null || _c === void 0 ? void 0 : _c.max; },
        creatureType: (token) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.race;
            }
            else if (actorType === 'npc') {
                creatureType = token.actor.data.data.race;
            }
            log(LogLevel.DEBUG, 'creatureType uesrpg-d100: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    wfrp4e: {
        id: 'wfrp4e',
        supportedTypes: ['character', 'npc', 'creature'],
        currentHP: (token) => token.actor.data.data.status.wounds.value,
        maxHP: (token) => token.actor.data.data.status.wounds.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.status) === null || _c === void 0 ? void 0 : _c.wounds) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.status) === null || _c === void 0 ? void 0 : _c.wounds) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.details.species.value;
            }
            else if (actorType === 'npc' || actorType === 'creature') {
                creatureType = token.actor.data.data.details.species.value;
            }
            log(LogLevel.DEBUG, 'creatureType wfrp4e: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    swade: {
        id: 'swade',
        supportedTypes: ['character', 'npc'],
        ascendingDamage: true,
        currentHP: (token) => token.actor.data.data.wounds.value,
        maxHP: (token) => token.actor.data.data.wounds.max,
        currentHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.wounds) === null || _c === void 0 ? void 0 : _c.value; },
        maxHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.wounds) === null || _c === void 0 ? void 0 : _c.max; },
        creatureType: (token, bloodColorSettings) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.details.species.name;
            }
            else if (actorType === 'npc') {
                // No such thing as monster type or species in SWADE unfortunately
                // Instead just search through the name for possible creature type
                const wordsInName = token.actor.data.name.replace(',', ' ').split(' ');
                for (let i = 0; i < wordsInName.length; i++) {
                    const word = wordsInName[i].toLowerCase();
                    if (bloodColorSettings[word])
                        creatureType = word;
                }
            }
            log(LogLevel.DEBUG, 'creatureType swade: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    'dark-heresy': {
        id: 'dark-heresy',
        supportedTypes: ['acolyte', 'npc'],
        currentHP: (token) => token.actor.data.data.wounds.value,
        maxHP: (token) => token.actor.data.data.wounds.max,
        currentHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.wounds) === null || _c === void 0 ? void 0 : _c.value; },
        maxHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.wounds) === null || _c === void 0 ? void 0 : _c.max; },
        creatureType: (token, bloodColorSettings) => {
            let creatureType;
            // No races or creatureTypes in Dark Heresy apparently
            // Instead just search through the name for possible creature type
            const wordsInName = token.actor.data.name.replace(',', ' ').split(' ');
            for (let i = 0; i < wordsInName.length; i++) {
                const word = wordsInName[i].toLowerCase();
                if (bloodColorSettings[word])
                    creatureType = word;
            }
            log(LogLevel.DEBUG, 'creatureType dark-heresy: ', token.name, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    twodsix: {
        id: 'twodsix',
        supportedTypes: ['traveller'],
        currentHP: (token) => token.actor.data.data.hits.value,
        maxHP: (token) => token.actor.data.data.hits.max,
        currentHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.hits) === null || _c === void 0 ? void 0 : _c.value; },
        maxHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.hits) === null || _c === void 0 ? void 0 : _c.max; },
        creatureType: (token) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'traveller') {
                creatureType = token.actor.data.data.species;
            }
            log(LogLevel.DEBUG, 'creatureType twodsix:', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    cyberpunkred: {
        id: 'cyberpunkred',
        supportedTypes: ['character', 'npc'],
        currentHP: (token) => token.actor.data.data.combatstats.healthpool.value,
        maxHP: (token) => token.actor.data.data.combatstats.healthpool.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.combatstats) === null || _c === void 0 ? void 0 : _c.healthpool) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.combatstats) === null || _c === void 0 ? void 0 : _c.healthpool) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token, bloodColorSettings) => {
            let creatureType;
            // No races or creatureTypes in Cyberpunk Red apparently
            // Instead just search through the name for possible creature type
            const wordsInName = token.actor.data.name.replace(',', ' ').split(' ');
            for (let i = 0; i < wordsInName.length; i++) {
                const word = wordsInName[i].toLowerCase();
                if (bloodColorSettings[word])
                    creatureType = word;
            }
            log(LogLevel.DEBUG, 'creatureType cyberpunkred: ', token.name, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    // WIP - not fully functional
    gurps4e: {
        id: 'gurps4e',
        supportedTypes: ['minchar'],
        currentHP: (token) => token.actor.data.data.tracked.hp.value,
        maxHP: (token) => token.actor.data.data.tracked.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tracked) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tracked) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token, bloodColorSettings) => {
            let creatureType;
            // No races or creatureTypes in GURPS apparently
            // Instead just search through the name for possible creature type
            const wordsInName = token.actor.data.name.replace(',', ' ').split(' ');
            for (let i = 0; i < wordsInName.length; i++) {
                const word = wordsInName[i].toLowerCase();
                if (bloodColorSettings[word])
                    creatureType = word;
            }
            log(LogLevel.DEBUG, 'creatureType gurps4e: ', token.name, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    D35E: {
        id: 'D35E',
        supportedTypes: ['character', 'npc'],
        currentHP: (token) => token.actor.data.data.attributes.hp.value,
        maxHP: (token) => token.actor.data.data.attributes.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                // @ts-expect-error bad definition
                creatureType = token.actor.data.items.find((i) => i.type === 'race').name;
            }
            else if (actorType === 'npc') {
                creatureType = token.actor.data.data.attributes.creatureType;
            }
            log(LogLevel.DEBUG, 'creatureType D35E:', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    lotfp: {
        id: 'lotfp',
        supportedTypes: ['character', 'monster'],
        currentHP: (token) => token.actor.data.data.hp.value,
        maxHP: (token) => token.actor.data.data.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.hp) === null || _c === void 0 ? void 0 : _c.value; },
        maxHPChange: (changes) => { var _a, _b, _c; return (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.hp) === null || _c === void 0 ? void 0 : _c.max; },
        creatureType: (token, bloodColorSettings) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.details.class;
            }
            else if (actorType === 'monster') {
                // No creatureType
                // Instead just search through the name for possible creature type
                const wordsInName = token.actor.data.name.replace(',', ' ').split(' ');
                for (let i = 0; i < wordsInName.length; i++) {
                    const word = wordsInName[i].toLowerCase();
                    if (bloodColorSettings[word])
                        creatureType = word;
                }
            }
            log(LogLevel.DEBUG, 'creatureType lotfp:', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    shadowrun5e: {
        id: 'shadowrun5e',
        supportedTypes: ['character', 'spirit', 'critter'],
        currentHP: (token) => token.actor.data.data.track.physical.value,
        maxHP: (token) => token.actor.data.data.track.physical.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.track) === null || _c === void 0 ? void 0 : _c.physical) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.track) === null || _c === void 0 ? void 0 : _c.physical) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token, bloodColorSettings) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.metatype;
            }
            else if (actorType === 'spirit') {
                creatureType = token.actor.data.data.spiritType + '-spirit';
            }
            else if (actorType === 'critter') {
                //no critterType
                // Instead just search through the name for possible creature type
                const wordsInName = token.actor.data.name.replace(',', ' ').split(' ');
                for (let i = 0; i < wordsInName.length; i++) {
                    const word = wordsInName[i].toLowerCase();
                    if (bloodColorSettings[word])
                        creatureType = word;
                }
            }
            log(LogLevel.DEBUG, 'creatureType shadowrun5e:', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    // starwarsffg threshold +1 is dead.
    starwarsffg: {
        id: 'starwarsffg',
        supportedTypes: ['character', 'minion'],
        ascendingDamage: true,
        currentHP: (token) => token.actor.data.data.stats.wounds.value,
        maxHP: (token) => token.actor.data.data.stats.wounds.max + 1,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.stats) === null || _c === void 0 ? void 0 : _c.wounds) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return ((_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.stats) === null || _c === void 0 ? void 0 : _c.wounds) === null || _d === void 0 ? void 0 : _d.max) + 1; },
        creatureType: (token, bloodColorSettings) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.species.value;
            }
            else if (actorType === 'minion') {
                // no minion species ...
                // Instead just search through the name for possible creature type
                const wordsInName = token.actor.data.name.replace(',', ' ').split(' ');
                for (let i = 0; i < wordsInName.length; i++) {
                    const word = wordsInName[i].toLowerCase();
                    if (bloodColorSettings[word])
                        creatureType = word;
                }
            }
            log(LogLevel.DEBUG, 'creatureType starwarsffg:', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    // WIP - lancer stores both mech hp and pilot hp in the same actor.data
    // that means we would need to change the structure of BnG to accommodate this
    // so for the moment only mech works.
    lancer: {
        id: 'lancer',
        supportedTypes: ['pilot', 'npc'],
        currentHP: (token) => token.actor.data.data.mech.hp.value,
        maxHP: (token) => token.actor.data.data.mech.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.mech) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.mech) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token) => {
            // both pilot and npc types are mechs
            const actorType = token.actor.data.type.toLowerCase();
            const creatureType = 'mech';
            log(LogLevel.DEBUG, 'creatureType lancer:', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    sfrpg: {
        id: 'sfrpg',
        supportedTypes: ['character', 'npc'],
        currentHP: (token) => token.actor.data.data.attributes.hp.value,
        maxHP: (token) => token.actor.data.data.attributes.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                creatureType = token.actor.data.data.details.race;
            }
            else if (actorType === 'npc') {
                if (token.actor.data.data.details.type) {
                    creatureType = token.actor.data.data.details.type;
                }
            }
            log(LogLevel.DEBUG, 'creatureType sfrpg: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
    morkborg: {
        id: 'morkborg',
        supportedTypes: ['character', 'creature', 'follower'],
        currentHP: (token) => token.actor.data.data.hp.value,
        maxHP: (token) => token.actor.data.data.hp.max,
        currentHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.value; },
        maxHPChange: (changes) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = changes === null || changes === void 0 ? void 0 : changes.actorData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.hp) === null || _d === void 0 ? void 0 : _d.max; },
        creatureType: (token) => {
            const actorType = token.actor.data.type.toLowerCase();
            let creatureType;
            if (actorType === 'character') {
                // @ts-expect-error bad definition
                creatureType = token.actor.data.items.find((i) => i.type === 'class').name;
            }
            else if (actorType === 'creature' || actorType === 'follower') {
                // name is currently the best we've got for a creatureType
                creatureType = token.actor.data.name;
            }
            log(LogLevel.DEBUG, 'creatureType morkborg: ', token.name, actorType, creatureType);
            if (creatureType)
                return creatureType.toLowerCase();
        },
    },
};
