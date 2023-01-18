import { Module } from '@nestjs/common';

import { MailTemplatesService } from './service';

@Module({
    imports: [],
    providers: [MailTemplatesService],
    exports: [MailTemplatesService],
})
export class MailTemplatesModule {}