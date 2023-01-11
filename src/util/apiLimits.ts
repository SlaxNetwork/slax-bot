import { GuildPremiumTier } from 'discord.js';

export const TIMEOUT_LIMIT = 28 * 24 * 60 * 60;

export const MESSAGE_EMBED_LIMIT = 10;

export const EMBED_DESCRIPTION_LIMIT = 4096;

export const EMBED_TOTAL_LIMIT = 6000;

export const EMBED_FIELD_LIMIT = 1024;

export const SELECT_MENU_TITLE_LIMIT = 100;

export const SELECT_MENU_VALUE_LIMIT = 100;

export const FILE_UPLOAD_LIMITS = new Map()
    .set(GuildPremiumTier.None, 8 * 1024 * 1024)
    .set(GuildPremiumTier.Tier1, 8 * 1024 * 1024)
    .set(GuildPremiumTier.Tier2, 50 * 1024 * 1024)
    .set(GuildPremiumTier.Tier3, 100 * 1024 * 1024);

export const AUTOCOMPLETE_OPTIONS_LIMIT = 25;

export const AUTOCOMPLETE_NAME_LIMIT = 100;

export const CHOICE_NAME_LIMIT = 100;

export const SELECT_MENU_OPTIONS_LIMIT = 25;

export const BAN_MESSAGE_DELETE_LIMIT = 7 * 24 * 60 * 60;

export const TIMEOUT_DURATION_LIMIT = 28 * 24 * 60 * 60;

export const MODAL_TITLE_LIMIT = 45;

export const TEXT_INPUT_LABEL_LIMIT = 45;

export const FETCH_MESSAGES_LIMIT = 100;

export const BULK_DELETE_LIMIT = 100;

export const BULK_DELETE_MAX_AGE = 14 * 24 * 60 * 60 * 1000;

export const FETCH_BAN_PAGE_SIZE = 1000;

export const MESSAGE_FILE_LIMIT = 10;