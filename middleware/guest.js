export default async function ({ $auth, redirect }) {
  const isLoggedIn = await $auth.loggedIn
  if (isLoggedIn) {
    return redirect('/')
  }
}