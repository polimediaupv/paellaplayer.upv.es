import useDebounce from "@/hooks/useDebounce"
import { useEffect, useState } from "react"

export default function JsonEditor<T>({
    title,
    defaultData,
    onChange,
    onError,
    debounceMs = 2000
}: {
    title: string
    defaultData: T
    onChange: (data: T) => void
    onError: (error: string) => void
    debounceMs?: number
}) {
    const [value, setValue] = useState<T>(defaultData);
    const debouncedValue = useDebounce(value, debounceMs);

    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newData = JSON.parse(event.target.value) as T;
            setValue(newData);
        } catch (error: any) {
            onError(error.message);
        }
    }

    return <details>
        <summary>{title}</summary>
        <textarea onChange={handleChange}>{JSON.stringify(value, null, 2)}</textarea>
    </details>
}