import { HastebinConversionConfiguration } from './feature/hastebinConversion';
import { MemberCountChannelConfiguration } from './feature/memberCountChannel';
import { ModLogConfiguration } from './feature/modLog';

export interface GuildConfiguration {
	id: string;
	main?: boolean;
	prefix?: string;
	features: {
		modLog?: ModLogConfiguration;
		memberCountChannel?: MemberCountChannelConfiguration;
		hastebinConversion?: HastebinConversionConfiguration;
	}
}