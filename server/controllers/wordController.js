import { prisma } from "../prismaClient.js";


const addWord = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { newWord, translation, exampleSentence, tags } = req.body

        if (!newWord || !translation) {
            return res.status(400).json({ error: "Fields must not be empty" })
        }

        const searchWord = await prisma.word.findFirst({
            where: {
                norwegianWord: newWord,
                userId: userId

            },
            select: {
                id: true,
                norwegianWord: true
            }
        })
        if (searchWord) {
            return res.status(400).json({ error: "Word must be unique" })
        }
        console.log("REQ USER:", req.user);

        const result = await prisma.word.create({
            data: {
                norwegianWord: newWord,
                translation: translation,
                userId: userId,
                exampleSentence: exampleSentence || null,
                tags: tags || [],
            },
            select: {
                id: true,
                userId: true,
                norwegianWord: true,
                translation: true,
                exampleSentence: true,
                tags: true
            }
        })

        return res.status(201).json({
            message: "Add complete!",
            result
        });

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}


const updateWord = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { oldWord, newWord, translation, exampleSentence, tags } = req.body


        const result = await prisma.word.update({
            where: {
                userId_norwegianWord: {
                    userId: userId,
                    norwegianWord: oldWord
                }
            },
            data: {
                norwegianWord: newWord,
                translation,
                exampleSentence: exampleSentence || null,
                tags: tags || []
            }
        });

        return res.status(200).json({
            message: "Update complete!",
            result
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Word not found" });
        }
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "Word already exists" });
        }
        res.status(500).json({ error: error.message })

    }
}

const getAllWords = async (req, res) => {
    try {
        const userId = req.user.userId;

        const allWord = await prisma.word.findMany({
            where: {
                userId: userId,
            },
            orderBy: { createdAt: 'desc' }
        })

        return res.status(200).json({ words: allWord });

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const deleteWord = async (req, res) => {
    try {
        const userId = req.user.userId;
        const wordId = Number(req.params.id)

        const word = await prisma.word.findUnique({ where: { id: wordId } });
        if (!word || word.userId !== userId) return res.status(404).json({ error: "Word not found" });

        const result = await prisma.word.delete({
            where: {
                id: wordId
            }
        })
        return res.status(200).json({ message: "Deleted!", result });

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

export default {
    addWord,
    updateWord,
    getAllWords,
    deleteWord
}

