import { useState } from "react"
import { createProject } from "../services/api"

export default function ProjectForm({ onSuccess }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [techStack, setTechStack] = useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("tech_stack", techStack) // ✅ FIX
    formData.append("image", image)

    await createProject(formData)

    // reset form
    setTitle("")
    setDescription("")
    setTechStack("")
    setImage(null)

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Tech Stack (React, Go, MySQL)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Create</button>
    </form>
  )
}