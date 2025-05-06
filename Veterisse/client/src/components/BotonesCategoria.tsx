
interface BotonesCategoriaProps {
  text: string;
  handleCategoria: (categoria: string) => void;
  isActive: boolean;
}

const BotonesCategoria = ({text, handleCategoria, isActive}: BotonesCategoriaProps) => {

  return (
    <button
      type='button'
      className={
        `inline-flex items-center justify-center whitespace-nowrap 
        rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background
        transition-all focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background 
        data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-pointer
        
        ${isActive
        ? 'bg-white text-foreground shadow-sm' 
        : 'bg-gray-50 text-gray-500'
        }
        `}
      onClick={() => handleCategoria(text)}
    >
      {text}
    </button>
  )
}

export default BotonesCategoria