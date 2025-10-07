import React from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaGripVertical,
} from "react-icons/fa";

export default function ButtonList({
  buttons,
  onEdit,
  onDelete,
  onReorder,
  onMove,
}) {
  const [theme, setTheme] = React.useState(document.body.className || "light");
  React.useEffect(() => {
    const observer = new window.MutationObserver(() => {
      setTheme(document.body.className || "light");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const [list, setList] = React.useState(buttons || []);
  const dragItem = React.useRef();
  const dragNode = React.useRef();

  React.useEffect(() => {
    setList(buttons || []);
  }, [buttons]);

  const handleDragStart = (e, params) => {
    dragItem.current = { ...params, initialIndex: params.index };
    dragNode.current = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "dragging");
    dragNode.current.classList.add("opacity-40");
    dragNode.current.classList.add("scale-95");
  };

  const handleDragEnter = (e, params) => {
    const currentIndex = dragItem.current.index;
    const targetIndex = params.index;
    if (currentIndex === targetIndex) return;
    const newList = Array.from(list);
    const [moved] = newList.splice(currentIndex, 1);
    newList.splice(targetIndex, 0, moved);
    dragItem.current.index = targetIndex;
    setList(newList);
  };

  const handleDragEnd = () => {
    if (dragNode.current) {
      dragNode.current.classList.remove("opacity-40");
      dragNode.current.classList.remove("scale-95");
    }
    const from = dragItem.current ? dragItem.current.initialIndex : null;
    const draggedId = dragItem.current ? dragItem.current.id : null;
    dragItem.current = null;
    dragNode.current = null;
    if (typeof onMove === "function" && draggedId !== null && from !== null) {
      const to = list.findIndex((b) => String(b.id) === String(draggedId));
      onMove({ id: draggedId, from, to });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-cyan-200" : "text-gray-800"
          }`}
        >
          Manage Links
        </h2>
        <p
          className={`text-sm mt-1 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Drag and drop to reorder • Click to edit or delete
        </p>
      </div>

      <div className="space-y-3">
        {list.map((btn, i) => (
          <div
            key={btn.id}
            draggable
            onDragStart={(e) => handleDragStart(e, { id: btn.id, index: i })}
            onDragEnter={(e) => handleDragEnter(e, { id: btn.id, index: i })}
            onDragEnd={handleDragEnd}
            className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-move hover:shadow-lg ${
              theme === "dark"
                ? "bg-gradient-to-r from-[#2a2d32] to-[#323539] border-cyan-800/30 hover:border-cyan-700/50 hover:shadow-cyan-900/20"
                : "bg-gradient-to-r from-white to-blue-50/30 border-blue-200/50 hover:border-blue-400/60 hover:shadow-blue-200/30"
            }`}
          >
            {/* Drag Handle */}
            <div
              className={`flex-shrink-0 transition-colors ${
                theme === "dark"
                  ? "text-gray-600 group-hover:text-cyan-500"
                  : "text-gray-400 group-hover:text-blue-500"
              }`}
            >
              <FaGripVertical className="text-xl" />
            </div>

            {/* Position Badge */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                theme === "dark"
                  ? "bg-cyan-900/30 text-cyan-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {i + 1}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold mb-1 truncate ${
                  theme === "dark"
                    ? "text-cyan-100 group-hover:text-white"
                    : "text-gray-800 group-hover:text-gray-900"
                }`}
              >
                {btn.name}
              </h3>
              <a
                href={btn.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`text-sm flex items-center gap-2 hover:underline truncate ${
                  theme === "dark"
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                <FaExternalLinkAlt className="flex-shrink-0 text-xs" />
                <span className="truncate">{btn.link}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(btn);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 shadow-sm ${
                  theme === "dark"
                    ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-yellow-900/20"
                    : "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-yellow-600/20"
                }`}
                title="Edit link"
              >
                <FaEdit />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (window.confirm(`Delete "${btn.name}"?`)) {
                    onDelete(btn.id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 shadow-sm ${
                  theme === "dark"
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-red-900/20"
                    : "bg-red-500 hover:bg-red-600 text-white shadow-red-600/20"
                }`}
                title="Delete link"
              >
                <FaTrashAlt />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>

            {/* Hover indicator line */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all opacity-0 group-hover:opacity-100 ${
                theme === "dark" ? "bg-cyan-500" : "bg-blue-500"
              }`}
            />
          </div>
        ))}

        {list.length === 0 && (
          <div
            className={`text-center py-16 rounded-xl border-2 border-dashed ${
              theme === "dark"
                ? "border-gray-700 text-gray-500"
                : "border-gray-300 text-gray-400"
            }`}
          >
            <p className="text-lg font-medium">No links yet</p>
            <p className="text-sm mt-1">Add your first link to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
