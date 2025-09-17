import useDebounce from "@/hooks/useDebounce"
import { useEffect, useState } from "react"
import ReactCodeMirror from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"


export default function JsonEditor<T>({
    defaultData,
    onChange,
    onError,
    debounceMs = 2000
}: {
    defaultData: T
    onChange: (data: T) => void
    onError: (error: string) => void
    debounceMs?: number
}) {
    const [value, setValue] = useState<T>(defaultData);
    const debouncedValue = useDebounce(value, debounceMs);

    useEffect(() => {
        setValue(defaultData);
    }, [defaultData]);
    
    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue]);

    useEffect(() => {
        return () => {
            // Here we ensure that the latest value is sent when the component unmounts
            onChange(value);
        }
    }, []);

    const handleChange = (value: string) => {
        try {
            const newData = JSON.parse(value) as T;
            // Only save if parsing is successful
            setValue(newData);
        } catch (error: any) {
            onError(error.message);
        }
    }

    return <ReactCodeMirror
        className="json-editor"
        value={JSON.stringify(value, null, 2)}
        onChange={handleChange}
        extensions={[json()]}
    />
}
