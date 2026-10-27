import { LayoutGrid, Table2 } from 'lucide-react'
import './App.css'
import { Toggle } from './components/ui/toggle'
import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { TablePage } from './pages/TablePage'
import { ROLE, type UserInterface } from './interfaces/UserInterface'
import initialContacts from "./data/data.json"
import { Card } from './components/ui/card'
import { TableSkeleton } from './components/table/TableSkeleton'
import { Input } from './components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { BoardSkeleton } from './components/board/BoardSkeleton'
import { BoardPage } from './pages/BoardPage'

const STORAGE_KEY = "contacts"

// Store the details to the localStorage if it does not exist
function getInitialContacts(): UserInterface[] {
  const storedContacts = localStorage.getItem(STORAGE_KEY)

  if (storedContacts !== null) {
    try {
      return JSON.parse(storedContacts) as UserInterface[]
    } catch (error) {
      console.error("Failed to parse saved contacts:", error)
    }
  }

  const contacts = initialContacts as UserInterface[]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))

  return contacts
}

function App() {
  const [toggle, setToggle] = useState<boolean>(false)

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<string>("ALL")
  const [data, setData] = useState<UserInterface[]>(getInitialContacts)
  const [loading, setLoading] = useState<boolean>(false)

  // This is responsible to store every new change to the localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  // this is responsible for detecting changes in the query
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // this is to refetch the data after create / update / delete
  const refetchData = () => {
    setLoading(true)
    const storedContacts = localStorage.getItem("contacts")

    if (storedContacts) {
      setData(JSON.parse(storedContacts))
    }
    setLoading(false)
  }

  // this is to filter the data query wise
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    return data.filter((user) => {
      const matchesSearch = [
        user.name,
        user.email,
        user.company,
        user.labels,
        user.role,
        user.stage,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      )

      const matchesRole =
        selectedRole === "ALL" || user.role === selectedRole

      return matchesSearch && matchesRole
    })
  }, [data, searchQuery, selectedRole])

  return (
    <div className="min-h-screen">
      <div className="w-full px-5 md:px-10 py-10">

        <div className="flex flex-col md:flex-row md:items-center justify-between">

          <h1 className="text-2xl md:text-3xl font-semibold">
            Alpha - Contact Management
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {toggle ? "Board View" : "Table View"}
            </span>

            <Toggle
              aria-label="Switch contact view"
              pressed={toggle}
              onPressedChange={setToggle}
              className="size-10 rounded-full border border-input
                       data-[state=on]:bg-primary
                       data-[state=on]:text-primary-foreground"
            >
              {toggle ? (
                <LayoutGrid className="size-4" />
              ) : (
                <Table2 className="size-4" />
              )}
            </Toggle>
          </div>

        </div>

        <div className="mt-8">
          {loading ? (
            <Card className="w-full my-5 text-xl flex flex-row items-center justify-center gap-3">
              {toggle ? (
                <BoardSkeleton />
              ) : (
                <TableSkeleton />
              )}
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-center gap-5">
                <Input
                  type="text"
                  name="searchQuery"
                  id="searchQuery"
                  onChange={(e) => handleQueryChange(e)}
                  value={searchQuery}
                  className="my-5"
                  placeholder="Search Users by Name, Email, Company, Labels and Stage"
                />

                <Select
                  value={selectedRole}
                  onValueChange={setSelectedRole}
                >
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ALL">All Roles</SelectItem>

                      {Object.values(ROLE).map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {toggle ? (
                <BoardPage data={filteredData} setData={setData} refetchData={refetchData} />
              ) : (
                <TablePage data={filteredData} refetchData={refetchData} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
