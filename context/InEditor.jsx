import { createContext, useContext, useEffect, useState } from 'react'


export const InEditorContext = createContext({})

export function InEditor({ children }) {
    const [inEditor, setInEditor] = useState(false)
    // const router = useRouter()
    // const newMode = router.query.mode

    // useEffect(() => {
    //     if (newMode) setInEditor(newMode)
    // }, [newMode])


    return (
      <InEditorContext.Provider value={{ inEditor, setInEditor }}>
        {children}
      </InEditorContext.Provider>
    )
}

export const useMode = () => useContext(InEditorContext)
