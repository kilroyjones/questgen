<script lang="ts">
  import { Auth } from "@supabase/auth-ui-svelte";
  import { ThemeSupa, supabase } from "@supabase/auth-ui-shared";

  export let data;
</script>

<div class="flex mb-3 mt-10 h-full">
  <div class="w-full md:w-1/4" />
  <div class="flex w-full md:w-1/2 lg:w-5/12 items-center justify-center">
    <div>
      {data.session?.user.email}
      <Auth
        supabaseClient={data.supabase}
        additionalData={[]}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  </div>
  <div class="w-full md:w-1/4" />
</div>
