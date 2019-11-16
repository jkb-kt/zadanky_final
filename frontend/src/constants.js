export const FormErrors = {
  PASSENGERS_ERROR: 'Cestující se nesmí opakovat',
  DRIVER_ERROR: 'Řidič nesmí být mezi cestujícími',
  APPROVER_ERROR: 'Schvalující nesmí být žadatel',
  TEMPLATE_NAME_REQUIRED: 'Musíte zadat název vzoru žádanky',
  CAR_NAME_REQUIRED: 'Musíte zadat název vozidla',
  SPZ_LENGTH: 'SPZ musí mít 7-8 znaků',
  SPZ_REQUIRED: 'Musíte zadat SPZ',
  FIRST_NAME_REQUIRED: 'Musíte zadat jméno',
  LAST_NAME_REQUIRED: 'Musíte zadat příjmení',
  PASSENGER_REQUIRED: 'Musíte zadat pasažéra',
  APPROVER_REQUIRED: 'Musíte zadat schvalujícího',
  DRIVER_REQUIRED: 'Musíte zadat řidiče',
  DATE_MIN: 'Datum nesmí být v minulosti',
  REASON_REQUIRED: 'Musíte zadat účel jízdy',
  DESTINATION_REQUIRED: 'Musíte zadat cíl jízdy',
  CAR_REQUIRED: 'Musíte zadat vozidlo',
  EMAIL_REQUIRED: 'Musíte zadat email',
  NOT_EMAIL: 'Zadejte email ve správném formátu',
  PASSWORD_REQUIRED: 'Musíte zadat heslo',
  PASSWORD_LENGTH: 'Heslo musí mít alespoň 6 znaků',
  PASSWORDS_MISMATCH: 'Hesla se musí rovnat',
  FIRST_NAME_LENGTH: 'Jméno nesmí být delší než 15 znaků',
  LAST_NAME_LENGTH: 'Příjmení nesmí být delší než 15 znaků',
  CAR_NAME_LENGTH: 'Název vozidla nesmí být delší než 25 znaků',
  DESTINATION_LENGTH: 'Název destinace nesmí být delší než 25 znaků',
  REASON_LENGTH: 'Název účelu nesmí být delší než 25 znaků',
  TEMPLATE_NAME_LENGTH: 'Název vzoru nesmí být delší než 30 znaků',
  NOTE_LENGTH: 'Poznámka nesmí být delší než 250 znaků',
  ROLE_REQUIRED: 'Musíte vybrat alespoň jednu roli',
  START_DATE_REQUIRED: 'Musíte zadat datum a čas začátku jízdy',
  END_DATE_REQUIRED: 'Musíte zadat datum a čas konce jízdy',
  END_DATE_SMALL: 'Konec jízdy musí být později než začátek',
  EXPORT_OPTION: 'Musíte vybrat, na základě čeho chcete exportovat',
  EXPORT_VALUE: 'Musíte vybrat konkrétní hodnotu pro export',
  COLOR_REQUIRED: 'Musíte vybrat barvu'
}

export const Notifications = {
  REQUISITION_CREATED: 'Nová žádanka byla úspěšně vytvořena',
  REQUISITION_UPDATED: 'Žádanka byla úspěšně aktualizována',
  TEMPLATE_UPDATED: 'Vzor byl úspěšně aktualizován',
  TEMPLATE_CREATED: 'Nový vzor žádanky byl úspěšně vytvořen',
  CAR_CREATED: 'Nové vozidlo bylo úspěšně vytvořeno',
  CAR_UPDATED: 'Vozidlo bylo úspěšně aktualizováno',
  USER_CREATED: 'Nový uživatel byl úspěšně vytvořen',
  USER_UPDATED: 'Uživatel byl úspěšně aktualizován',
  REASON_CREATED: 'Nový účel jízdy byl úspěšně vytvořen',
  REASON_UPDATED: 'Účel jízdy byl úspěšně aktualizován',
  DESTINATION_CREATED: 'Nová destinace byla úspěšně vytvořena',
  DESTINATION_UPDATED: 'Destinace byla úspěšně aktualizována',
  ERROR: 'Chyba',
  ERROR_DESCRIPTION: 'Došlo k neočekávané chybě',
  SUCCESS: 'Úspěch',
  UNAUTHENTICATED: 'Došlo k chybě. Prosím, příhlašte se znovu.',
  UNAUTHORIZED: 'K vykonání této akce nemáte dostatečná oprávnění.',
  VALIDATION_ERROR: 'Zadané hodnoty neodpovídají schématu.',
  REQ_OVERLAP: 'Dané vozidlo není v této době k dispozici.',
  REGISTER_SUCCESS: 'Registrace proběhla v pořádku. Vyčkejte na aktivaci účtu administrátorem.',
  AUTH_EXISTS: 'Přístupový účet s tímto emailem již existuje. Zvolte, prosím, jiný.',
  AUTH_NOT_ACTIVATED: 'Tento účet není aktivní. Kontaktujte, prosím, administrátora.',
  INVALID_LOGIN: 'Zadaná kombinace přihlašovacích údajů neodpovídá žádnému účtu.',
  AUTH_UPDATED: 'Přístupový účet byl úspěšně aktualizován',
  REQUISITION_DELETED: 'Žádanka byla úspěšně smazána',
  PASSWORD_RESET_REQUEST: 'Na email vám byla odeslána zpráva s dalšími instrukcemi',
  AUTH_DOESNT_EXIST: 'Tento email není asociován s žádným účtem',
  PASSWORD_CHANGED: 'Heslo bylo úspěšně změněno. Můžete se s ním přihlásit.',
  TOKEN_EXPIRED: 'Požadavek na změnu hesla vypršel. Proveďte jej, prosím, znovu.'
}

export const ErrorCodes = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQ_OVERLAP: 'REQ_OVERLAP',
  AUTH_EXISTS: 'AUTH_EXISTS',
  AUTH_NOT_ACTIVATED: 'AUTH_NOT_ACTIVATED',
  AUTH_DOESNT_EXIST: 'AUTH_DOESNT_EXIST',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED'
}

export const ModalText = {
  DESTINATION_UPDATE_MESSAGE:
    'Tato akce povede k přejmenování destinace na všech místech, kde byla použita. Opravdu chcete aktualizovat destinaci?',
  DESTINATION_UPDATE_TITLE: 'Aktualizace destinace',
  DESTINATION_CREATE_MESSAGE:
    'Tato akce povede k vytvoření nové destinace. Opravdu chcete destinaci vytvořit?',
  DESTINATION_CREATE_TITLE: 'Nová destinace',
  REASON_UPDATE_MESSAGE:
    'Tato akce povede k přejmenování účelu jízdy na všech místech, kde byl použit. Opravdu chcete aktualizovat účel jízdy?',
  REASON_UPDATE_TITLE: 'Aktualizace účelu jízdy',
  REASON_CREATE_MESSAGE:
    'Tato akce povede k vytvoření nového účelu jízdy. Opravdu chcete účel jízdy vytvořit?',
  REASON_CREATE_TITLE: 'Nový účel jízdy',
  USER_UPDATE_MESSAGE:
    'Tato akce povede k aktualizaci uživatele na všech místech, kde byl použit. Opravdu chcete aktualizovat uživatele?',
  USER_UPDATE_TITLE: 'Aktualizace uživatele',
  USER_CREATE_MESSAGE:
    'Tato akce povede k vytvoření nového uživatele. Opravdu chcete uživatele vytvořit?',
  USER_CREATE_TITLE: 'Nový uživatel',
  TEMPLATE_UPDATE_MESSAGE: 'Opravdu chcete aktualizovat vzor žádanky?',
  TEMPLATE_UPDATE_TITLE: 'Aktualizace vzoru žádanky',
  TEMPLATE_CREATE_MESSAGE:
    'Tato akce povede k vytvoření nového vzoru žádanky. Opravdu chcete vzor žádanky vytvořit?',
  TEMPLATE_CREATE_TITLE: 'Nový vzor žádanky',
  REQUISITION_UPDATE_MESSAGE: 'Opravdu chcete aktualizovat žádanku?',
  REQUISITION_UPDATE_TITLE: 'Aktualizace žádanky',
  REQUISITION_CREATE_MESSAGE:
    'Tato akce povede k vytvoření nové žádanky. Opravdu chcete žádanku vytvořit?',
  REQUISITION_CREATE_TITLE: 'Nová žádanka',
  CAR_UPDATE_MESSAGE:
    'Tato akce povede k aktualizaci vozidla na všech místech, kde bylo použito. Opravdu chcete aktualizovat vozidlo?',
  CAR_UPDATE_TITLE: 'Aktualizace vozidla',
  CAR_CREATE_MESSAGE:
    'Tato akce povede k vytvoření nového vozidla. Opravdu chcete vozidlo vytvořit?',
  CAR_CREATE_TITLE: 'Nové vozidlo',
  EXPORT_TITLE: 'Export',
  EXPORT_MESSAGE: 'Opravdu chcete exportovat žádanky na základě zvolených parametrů?',
  AUTH_UPDATE_TITLE: 'Aktualizace přístupového účtu',
  AUTH_UPDATE_MESSAGE:
    'Tato akce povede k aktualizaci práv přístupového účtu. Opravdu jej chcete aktualizovat?',
  REQUISITION_DELETE_MESSAGE:
    'Opravdu chcete žádanku zrušit? Tuto akci již nebude možné vrátit zpět.',
  REQUISITION_DELETE_TITLE: 'Zrušení žádanky'
}
