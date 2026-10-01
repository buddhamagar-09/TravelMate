# React Query Reference

## Setup (Already Done in This Project)

### 1. Install
```bash
npm install @tanstack/react-query
```

### 2. Wrap your app in `QueryClientProvider` (in `main.jsx`)
```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,                    // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
```

---

## Basic Syntax

### Fetching Data (GET)
```jsx
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["packages"],              // Unique cache key
  queryFn: async () => {                // Function that fetches data
    const response = await api.get("/packages");
    return response.data;
  },
});
```

### Conditional Fetching (only fetch when needed)
```jsx
const { data: searchResults = [] } = useQuery({
  queryKey: ["search-packages", searchQuery],  // Cache key includes the query
  queryFn: async () => {
    const response = await api.get(`/search-packages?query=${encodeURIComponent(searchQuery)}`);
    return response.data;
  },
  enabled: !!searchQuery,  // Only runs when searchQuery is not empty
});
```

### Error Handling
```jsx
const { data } = useQuery({
  queryKey: ["packages"],
  queryFn: async () => {
    const response = await api.get("/packages");
    return response.data;
  },
  onError: () => {
    toast.error("Failed to load packages");
  },
});
```

---

## What `useQuery` Returns

| Property    | Type    | Description                                      |
|-------------|---------|--------------------------------------------------|
| `data`      | any     | The fetched data (undefined while loading)       |
| `isLoading` | boolean | True while fetching for the first time           |
| `isError`   | boolean | True if the query failed                          |
| `error`     | Error   | The error object if the query failed              |
| `refetch`   | function| Manually re-fetch the data                       |

---

## Mutations (POST, PUT, DELETE)

Use `useMutation` for creating, updating, or deleting data:

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function MyComponent() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newData) => {
      const response = await api.post("/packages", newData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Created successfully!");
      // Invalidate cache to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = (formData) => {
    mutation.mutate(formData);  // Call mutate to execute
  };

  return (
    <button onClick={handleSubmit} disabled={mutation.isPending}>
      {mutation.isPending ? "Saving..." : "Save"}
    </button>
  );
}
```

### `useMutation` Returns

| Property      | Type     | Description                          |
|---------------|----------|--------------------------------------|
| `mutate`      | function | Execute the mutation                 |
| `isPending`   | boolean  | True while mutation is running       |
| `isError`     | boolean  | True if mutation failed              |
| `isSuccess`   | boolean  | True if mutation succeeded           |
| `error`       | Error    | The error object if mutation failed  |

---

## Cache Invalidation (Refetch After Changes)

After creating, updating, or deleting data, invalidate the cache to get fresh data:

```jsx
const queryClient = useQueryClient();

// Invalidate a specific query
queryClient.invalidateQueries({ queryKey: ["packages"] });

// Invalidate all queries that start with "packages"
queryClient.invalidateQueries({ queryKey: ["packages"], exact: false });

// Invalidate all queries
queryClient.invalidateQueries();
```

---

## Real Examples From This Project

### Example 1: Fetch All Packages (`FetchPackages.jsx`)
```jsx
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export default function FetchPackages() {
  const { data: packages = [], isLoading: loading, refetch: fetchPackages } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await api.get("/packages");
      return response.data;
    },
  });

  return { packages, fetchPackages, loading };
}
```

### Example 2: Search Packages (`Package.jsx`)
```jsx
const { data: searchResults = [] } = useQuery({
  queryKey: ["search-packages", searchQuery],
  queryFn: async () => {
    const response = await api.get(`/search-packages?query=${encodeURIComponent(searchQuery)}`);
    return response.data;
  },
  enabled: !!searchQuery,
  onError: () => {
    toast.error("Failed to search packages. Please try again.");
  },
});
```

### Example 3: Fetch for Suggestions (`Header.jsx`)
```jsx
const { data: packages = [] } = useQuery({
  queryKey: ["packages"],
  queryFn: async () => {
    const response = await api.get("/packages");
    return response.data;
  },
  onError: () => {
    toast.error("Failed to load search suggestions");
  },
});
```

---

## Key Rules

1. **Always use a unique `queryKey`** — it's how React Query identifies cached data
2. **`queryFn` must return a promise** — it's the function that fetches data
3. **Use `enabled` for conditional fetching** — skip the query when prerequisites aren't met
4. **Use `useMutation` for POST/PUT/DELETE** — not `useQuery`
5. **Invalidate cache after mutations** — so UI shows fresh data
6. **Default values** — use `data: packages = []` to avoid undefined errors

---

## Common Patterns

### Loading State
```jsx
if (isLoading) {
  return <div>Loading...</div>;
}
```

### Error State
```jsx
if (isError) {
  return <div>Error: {error.message}</div>;
}
```

### Using Data
```jsx
return (
  <div>
    {packages.map((pkg) => (
      <div key={pkg.id}>{pkg.title}</div>
    ))}
  </div>
);
```

### Refetch Button
```jsx
<button onClick={() => refetch()}>Refresh</button>
```
