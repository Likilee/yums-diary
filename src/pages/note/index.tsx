import CreateNoteModal from '@/components/CreateNoteModal'

export default function NotePage() {
  return (
    <>
      <main>
        <textarea
          placeholder="유미의 노트 기능은 조금 기다려 주세요 :)"
          className="textarea textarea-bordered textarea-lg w-full resize-none"
        ></textarea>
      </main>
      <CreateNoteModal
        onClickNewNotebook={() => console.log('New Notebook')}
        onClickNewNote={() => console.log('New Note')}
      />
    </>
  )
}
