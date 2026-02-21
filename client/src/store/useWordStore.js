import { create } from "zustand";
import { getWord } from "../api/services/wordService.js";
import { addWord } from "../api/services/wordService.js";

export const useWordStore = create((set) => ({

    words: [],
    error: null,
    isLoading: false,
    fetchWords: async () => {
        set({ isLoading: true })
        try {
            const data = await getWord() // data = { words: [...] }
            set({ words: Array.isArray(data.words) ? data.words : [], isLoading: false })
        } catch (e) {
            set({ words: [], isLoading: false, error: e.message })
        }
    },

    addWords: async (credentials) => {
        try {
            set({ error: null })

            const newWord = await addWord(credentials)

            set((state) => ({
                words: [...state.words, newWord]
            }))

            return { success: true }

        } catch (error) {
            const message =
                error.response?.data?.message || "Помилка отримання"

            set({ error: message })

            return { success: false, error: message }
        }
    }

}))
export default useWordStore;