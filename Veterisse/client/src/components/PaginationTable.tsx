"use client"
import React, { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationTableProps {
  changePage: (contentPage: any[]) => void;
  tableData: any[];
  rangeContent?: number
}

export default function PaginationTable({
  changePage, 
  tableData,
  rangeContent = 10
}: PaginationTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Configuración de la paginación
  const productsPerPage = rangeContent
  const totalPages = Math.ceil(tableData.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const productsPagination = tableData.slice(startIndex, endIndex)

  useEffect(() => {
    changePage(productsPagination)
  }, [currentPage, tableData.length])

  useEffect(() => {
    setCurrentPage(1)
  }, [tableData])

  // Manejadores de paginación
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Generar array de números de página para mostrar
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 3
    
    if (totalPages <= maxVisiblePages) {
      // Si hay 3 páginas o menos, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Lógica para páginas cuando hay más de 3
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3)
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages)
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1)
      }
    }
    
    return pageNumbers
  }
  return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePreviousPage}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {getPageNumbers().map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink 
                onClick={() => handlePageClick(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          {totalPages > 3 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={handleNextPage}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}
