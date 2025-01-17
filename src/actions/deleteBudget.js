import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helper";
import { redirect } from "react-router-dom";

export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        });

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
        })

        associatedExpenses.forEach((epxense) => {
            deleteItem({
                key: "expenses",
                id: epxense.id,
            });
        });

        toast.success("Budget deleted successfully!");
    }  catch (e) {
        throw new Error("There was a problem deleting your budget.");
    }
    return redirect("/");
}