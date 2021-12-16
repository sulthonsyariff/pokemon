import Card from "./Card"

const List = ({ pokemon }) => {
  return (
    <>
      {/* list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {pokemon.results.map(data => (
          <Card
            item={data}
            key={data.name}
          />
        ))}
      </div>
    </>
  )
}

export default List;