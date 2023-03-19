import { StructureResolver } from "sanity/desk"
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"

export const structure: StructureResolver = (S, context) => {
    return S.list()
        .title('Base')
        .items([
            ...S.documentTypeListItems(),
            orderableDocumentListDeskItem({ type: 'methodology', title: "Methodology", S, context }),
            orderableDocumentListDeskItem({ type: 'principle', title: "Principle", S, context }),
            orderableDocumentListDeskItem({ type: 'project', title: "Project", S, context }),
            orderableDocumentListDeskItem({ type: 'review', title: "Review", S, context }),
            orderableDocumentListDeskItem({ type: 'technology-type', title: "Technology type", S, context }),
        ])
}