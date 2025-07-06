import { ref } from "vue";

const loading = ref(false);


export function useModal() {

    const isOpen = ref(false)


    function open() {
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
        loading.value = false
    }

    return {
        isOpen,
        open,
        close,
        loading
    }



}