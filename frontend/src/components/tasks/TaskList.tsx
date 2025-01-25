import React, { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import {
    ColDef,
    ICellRendererParams,
    ModuleRegistry,
} from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Task } from "../../models/Task";
import { getTasks, deleteTask } from "../../services/api";
import { Link } from "react-router-dom";

// Enregistrez le module avant d'utiliser AgGridReact
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const gridRef = useRef<AgGridReact<Task>>(null);
    const [filterText, setFilterText] = useState<string>("");
    const [filterPriority, setFilterPriority] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filterCategory, setFilterCategory] = useState<string>("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                console.log("Tâches récupérées :", fetchedTasks);
                setTasks(fetchedTasks);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id);
            // Mettre à jour la liste des tâches après la suppression
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
            console.log("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("Error deleting task");
        }
    };

    const onFilterChanged = (event: any) => {
        // Mettre à jour les états des filtres en fonction de l'événement de filtre
        const filterModel = gridRef.current?.api?.getFilterModel();
        console.log("Filter Model:", filterModel);

        // Titre
        if (filterModel?.title) {
            setFilterText(filterModel.title.filter);
        } else {
            setFilterText("");
        }

        // Priorité
        if (filterModel?.priority) {
            setFilterPriority(filterModel.priority.values.join(","));
        } else {
            setFilterPriority("");
        }

        // Statut
        if (filterModel?.status) {
            setFilterStatus(filterModel.status.values.join(","));
        } else {
            setFilterStatus("");
        }

        // Catégorie
        if (filterModel?.category) {
            setFilterCategory(filterModel.category.filter);
        } else {
            setFilterCategory("");
        }
    };

    const columnDefs = useMemo((): ColDef<Task>[] => {
        return [
            { headerName: "ID", field: "id" },
            {
                headerName: "Title",
                field: "title",
                sortable: true,
                filter: "agTextColumnFilter",
                filterParams: {
                    applyButton: true,
                    clearButton: true,
                },
            },
            {
                headerName: "Description",
                field: "description",
                filter: "agTextColumnFilter",
                filterParams: {
                    applyButton: true,
                    clearButton: true,
                },
            },
            {
                headerName: "Priority",
                field: "priority",
                sortable: true,
                filter: "agSetColumnFilter",
                filterParams: {
                    values: ["High", "Medium", "Low"],
                    applyButton: true,
                    clearButton: true,
                },
            },
            {
                headerName: "Status",
                field: "status",
                sortable: true,
                filter: "agSetColumnFilter",
                filterParams: {
                    values: ["In Progress", "Completed", "Blocked"],
                    applyButton: true,
                    clearButton: true,
                },
            },
            {
                headerName: "Category",
                field: "category",
                sortable: true,
                filter: "agTextColumnFilter",
                filterParams: {
                    applyButton: true,
                    clearButton: true,
                },
            },
            {
                headerName: "Actions",
                cellRenderer: (params: ICellRendererParams<Task>) => (
                    <>
                        <button onClick={() => handleDelete(params.data!.id)}>
                            Delete
                        </button>
                        <Link to={`/update/${params.data!.id}`}>Update</Link>
                    </>
                ),
            },
        ];
    }, [tasks]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            filter: true,
        } as ColDef;
    }, []);

    // La fonction onGridReady n'a pas besoin d'être dans un useCallback ici
    const onGridReady = (params: any) => {
        console.log("ag-Grid is ready", params);
    };

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Filter by Title/Description"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                </select>
                <input
                    type="text"
                    placeholder="Filter by Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                />
            </div>
            <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                <AgGridReact<Task>
                    ref={gridRef}
                    rowData={tasks}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    onFilterChanged={onFilterChanged}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
    );
};

export default TaskList;