<script lang="ts">
  // TODO: When clicking transition to a loading page
</script>

<div class="flex mb-3 mt-10 h-full">
  <div class="w-full md:w-1/4" />
  <div class="flex w-full flex-col md:w-1/2 lg:w-5/12 items-center justify-center">
    <div>
      <form action="?/signinGoogle" method="POST">
        <button type="submit">
          <img
            src="/images/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png"
            alt="Google Login"
          />
        </button>
      </form>
    </div>
    <div>
      <div class="text-md mt-2 mb-2 text-center">
        Only social auth at the moment, but it's easy enough to set up email or other providers
      </div>
      <form class="space-y-4">
        <div>
          <label for="email" class="label">
            <span class="text-base label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email Address"
            class="w-full input input-bordered input-primary"
            disabled
          />
        </div>
        <div>
          <label for="password" class="label">
            <span class="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            class="w-full input input-bordered input-primary"
            disabled
          />
        </div>
        <a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >Forget Password?</a
        >
        <div class="flex justify-center">
          <button class="btn btn-primary center" disabled>Login</button>
        </div>
      </form>
    </div>
  </div>
  <div class="w-full md:w-1/4" />
</div>
