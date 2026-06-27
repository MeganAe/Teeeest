export interface ApiResponse<T = any> {
  success: boolean
  data: T
  timestamp: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

export interface SelectOption {
  value: string
  label: string
}

export interface NavItem {
  path: string
  name: string
  icon: string
  roles?: string[]
  children?: NavItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
  }[]
}

export interface StatsCard {
  title: string
  value: number | string
  icon: string
  trend?: number
  color?: string
}