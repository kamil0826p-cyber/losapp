import { ref, onMounted } from "vue";
import { auth } from "../firebase";

const currentUser = ref<any>(null);

export function useAuth() {
  onMounted(() => {
    auth.onAuthStateChanged((user) => {
      currentUser.value = user;
    });
  });

  return { auth, currentUser };
}
