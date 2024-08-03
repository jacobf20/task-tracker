import { Class } from "./Class"

export default function Page({ params }: { params: { class: string } }) {
    return <div><Class className={params.class}/></div>
}