import React, { useEffect, useState } from 'react'
import useWordStore from "../store/useWordStore";

export default function Dashboard() {
  const { words, fetchWords, isLoading, error } = useWordStore()
  const { addWords } = useWordStore()

  const [newWord, setNewWord] = useState('')
  const [translation, setTranslate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await addWords({ newWord, translation })

    if (res.success) {
      console.log("Слово добавлено")
      setNewWord('')
      setTranslate('')
      fetchWords() 
    }
  }

  useEffect(() => {
    fetchWords()
  }, []) 

  return (
    <div className='container  max-w-4xl min-h-screen m-auto flex-row items-center justify-center '>
      <h1>Dashboard</h1>

      <input
        className='input'
        type="text"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
        placeholder="Norwegian word"
      />
      <input
        className='input'
        type="text"
        value={translation}
        onChange={(e) => setTranslate(e.target.value)}
        placeholder="Translation"
      />

      <button className='btn' onClick={handleSubmit}>Додати</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {words.map((word) => (
        <div key={word.id}>
          {word.norwegianWord} — {word.translation}
        </div>
      ))}
    </div>
  )
}