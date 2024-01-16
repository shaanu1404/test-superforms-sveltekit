<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";

  export let data: PageData;

  const { form, errors, enhance, submitting, message } = superForm(data.form);
</script>

{#if data.contacts}
  <ul>
    {#each data.contacts as contact (contact.id)}
      <li>
        <h6>{contact.email}</h6>
        <p>{contact.fullname}</p>
      </li>
    {/each}
  </ul>
{/if}

<form method="post" use:enhance>
  {#if $submitting}
    <small>Loading...</small>
  {/if}
  {#if $message}
    <p>{$message}</p>
  {/if}
  <div>
    <label for="email">Email Address</label>
    <input
      id="email"
      type="email"
      name="email"
      bind:value={$form.email}
      placeholder="Enter email address"
    />
    {#if $errors.email}
      <small>{$errors.email}</small>
    {/if}
  </div>
  <div>
    <label for="fullname">Fullname</label>
    <input
      id="fullname"
      type="text"
      name="fullname"
      bind:value={$form.fullname}
      placeholder="Enter full name"
    />
    {#if $errors.fullname}
      <small>{$errors.fullname}</small>
    {/if}
  </div>
  <button type="submit" disabled={$submitting}>Submit</button>
</form>
