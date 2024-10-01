import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

export function CardFilme({ nome, email, telefone, imagem_url, papel, profissao}) {
  return (
    <div
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-md border border-gray-200"
    >
      <div className="flex flex-1 flex-col p-8">
        <img alt="" src={imagem_url} className="mx-auto h-32 w-32 flex-shrink-0" />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{nome}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Profissao</dt>
          <dd className="text-sm text-gray-500">{profissao}</dd>
          <dt className="sr-only">Papel</dt>
          <dd className="mt-3">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {papel}
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
              Email
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${telefone}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <PhoneIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}