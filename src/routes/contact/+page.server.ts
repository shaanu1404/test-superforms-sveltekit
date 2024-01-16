import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import db from '$lib/database';

// Name has a default value just to display something in the form.
const schema = z.object({
    fullname: z.string().min(1, 'Required').trim(),
    email: z.string().email('Invalid email address').min(1, 'Required').trim()
        .refine(async (email) => {
            const contact = await db.contact.findUnique({ where: { email } })
            return !contact;
        }, { message: 'Email already exists' })
});

export const load = (async ({ request }) => {
    const form = await superValidate(schema);
    return {
        form,
        contacts: await db.contact.findMany()
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, schema);
        if (!form.valid) {
            return fail(400, { form })
        }
        await db.contact.create({ data: form.data })
        return message(form, 'Successfully sent details')
    }
}