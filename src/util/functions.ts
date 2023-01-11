import { Message } from 'discord.js';
import path from 'path';
import { HASTEBIN_URL, IMAGE_LINK_REGEX } from './constants';

export function listToString(list: string[]) {
	return list.join('\n');
}

export function arrayDiff<T>(aArray: T[], bArray: T[]) {
	const added = bArray.filter(e => !aArray.includes(e));
	const removed = aArray.filter(e => !bArray.includes(e));

	return {
		added,
		removed,
	};
}

export async function generateHastebinFromInput(input: string, ext: string) {
	const res = await fetch(`${HASTEBIN_URL}/documents`, {
		method: 'POST',
		body: input,
		headers: { 'Content-Type': 'text/plain' },
	});
	if (!res.ok) throw new Error(`Error while generating hastebin: ${res.statusText}`);
	const { key }: { key: string } = await res.json();
	return `${HASTEBIN_URL}/${key}.${ext}`;
}

export function findImageFromMessage(msg: Message): string | undefined {
	let returnAttachment: string | undefined;
	const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

	const attachment = msg.attachments.find(file =>
		extensions.includes(path.extname(file.url))
	);

	if (attachment) returnAttachment = attachment.url;

	if (!returnAttachment) {
		const match = msg.content.match(IMAGE_LINK_REGEX);
		if (match && extensions.includes(path.extname(match[0])))
			returnAttachment = match[0];
	}

	return returnAttachment;
}