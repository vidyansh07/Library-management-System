import {useEffect, useRef} from 'react';

const Editor = ({loading, getValue})=>{
    const el = useRef()
    const {CKEditor, ClassicEditor} = (el.current || {})
    const config = {
        toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            'bold',
            'italic',
            '|',
            'numberedList', 
            'bulletedList'
        ]
    }


    useEffect(()=>{
        el.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        }
    },[])

    return (
        <div>
            {
                !loading && 
                <CKEditor 
                    config={config}
                    editor={ClassicEditor}
                    onChange={(event, editor)=>{
                        const data = editor.getData()
                        getValue(data)
                    }}
                />
            }          
        </div>
    )
}

export default Editor;