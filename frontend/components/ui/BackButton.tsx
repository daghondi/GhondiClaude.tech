export default function NotFoundBackButton() {
  return (
    <button 
      onClick={() => window.history.back()}
      className="btn-secondary"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Go Back
    </button>
  )
}
